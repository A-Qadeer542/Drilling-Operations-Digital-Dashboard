export const typeDefs = `
  type Well {
    id: ID!
    name: String!
    depth: Float
    operator: String
    field: String
    latitude: Float
    longitude: Float
    status: String
  }

  type DrillingMetrics {
    rop: Float
    torque: Float
    pressure: Float
    weightOnBit: Float
    efficiencyIndex: Float
    timestamp: String
  }

  type Query {
    wells: [Well!]!
    well(id: ID!): Well
  }

  type Subscription {
    drillingMetrics(wellId: ID!): DrillingMetrics
  }
`;


