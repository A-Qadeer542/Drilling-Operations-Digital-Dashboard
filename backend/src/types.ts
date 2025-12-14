import { PubSub } from "graphql-subscriptions";

export interface Well {
  id: string;
  name: string;
  depth?: number;
  operator?: string;
  field?: string;
  latitude?: number;
  longitude?: number;
  status?: string;
}

export interface DrillingMetrics {
  rop: number;
  torque: number;
  pressure: number;
  weightOnBit: number;
  efficiencyIndex: number;
  timestamp: string;
  wellId: string;
}

export interface DataSources {
  wells: WellsDataSource;
}

export interface Context {
  dataSources: DataSources;
  pubsub: PubSub;
}

export interface WellsDataSource {
  getWells: () => Well[];
  getWellById: (id: string) => Well | undefined;
}


