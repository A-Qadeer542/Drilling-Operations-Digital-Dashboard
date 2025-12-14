import { withFilter } from "graphql-subscriptions";
import type { Context, DrillingMetrics } from "../types.js";

export const resolvers = {
  Query: {
    wells: (_: unknown, __: unknown, { dataSources }: Context) =>
      dataSources.wells.getWells(),
    well: (_: unknown, { id }: { id: string }, { dataSources }: Context) =>
      dataSources.wells.getWellById(id)
  },
  Subscription: {
    drillingMetrics: {
      subscribe: withFilter(
        (_: unknown, __: unknown, { pubsub }: Context) =>
          pubsub.asyncIterator("DRILLING_METRICS"),
        (payload: { drillingMetrics: DrillingMetrics }, variables: { wellId: string }) =>
          payload.drillingMetrics.wellId === variables.wellId
      ),
      resolve: (payload: { drillingMetrics: DrillingMetrics }) => payload.drillingMetrics
    }
  }
};

