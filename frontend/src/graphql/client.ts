import { ApolloClient, InMemoryCache, split, createHttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpUri =
  import.meta.env.VITE_GRAPHQL_HTTP ?? "http://localhost:4000/graphql";
const wsUri = import.meta.env.VITE_GRAPHQL_WS ?? "ws://localhost:4000/graphql";

const httpLink = createHttpLink({ uri: httpUri });

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsUri
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});


