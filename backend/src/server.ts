import http from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./resolvers/index.js";
import { WellsDataSource } from "./datasources/wells.js";
import { MetricsEngine } from "./simulation/metricsEngine.js";
import type { Context } from "./types.js";

async function main() {
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  const app = express();
  const httpServer = http.createServer(app);

  const wellsDataSource = new WellsDataSource();
  const pubsub = new PubSub();
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const metricsEngine = new MetricsEngine(pubsub, wellsDataSource.getWells());
  metricsEngine.start();

  const server = new ApolloServer<Context>({ schema });

  const context = async (): Promise<Context> => ({
    dataSources: { wells: wellsDataSource },
    pubsub
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql"
  });

  useServer({ schema, context }, wsServer as any);

  await server.start();

  app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server, { context }));

  httpServer.listen(port, () => {
    console.log(`GraphQL server ready at http://localhost:${port}/graphql`);
  });
}

main().catch(console.error);

