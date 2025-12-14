import { gql } from "@apollo/client";

export const GET_WELLS = gql`
  query GetWells {
    wells {
      id
      name
      depth
      operator
      field
      latitude
      longitude
      status
    }
  }
`;

export const DRILLING_METRICS = gql`
  subscription DrillingMetrics($wellId: ID!) {
    drillingMetrics(wellId: $wellId) {
      rop
      torque
      pressure
      weightOnBit
      efficiencyIndex
      timestamp
    }
  }
`;


