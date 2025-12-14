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
}


