import { PubSub } from "graphql-subscriptions";
import type { DrillingMetrics, Well } from "../types.js";

const channel = "DRILLING_METRICS";

const ranges = {
  rop: { min: 0, max: 60, variance: 3 },
  torque: { min: 5, max: 35, variance: 2.2 },
  pressure: { min: 140, max: 360, variance: 6 },
  weightOnBit: { min: 5, max: 40, variance: 2 }
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const nextValue = (current: number, min: number, max: number, variance: number) =>
  clamp(current + (Math.random() - 0.5) * variance, min, max);

const efficiency = (metrics: Pick<DrillingMetrics, "rop" | "torque" | "pressure" | "weightOnBit">) => {
  const ropScore = metrics.rop / ranges.rop.max;
  const torqueScore =
    1 -
    Math.abs(metrics.torque - (ranges.torque.max + ranges.torque.min) / 2) /
      ranges.torque.max;
  const pressureScore =
    1 -
    Math.abs(metrics.pressure - (ranges.pressure.max + ranges.pressure.min) / 2) /
      ranges.pressure.max;
  const wobScore =
    1 -
    Math.abs(metrics.weightOnBit - (ranges.weightOnBit.max + ranges.weightOnBit.min) / 2) /
      ranges.weightOnBit.max;
  const normalized = [ropScore, torqueScore, pressureScore, wobScore].map((value) =>
    clamp(value, 0, 1)
  );
  const average = normalized.reduce((sum, value) => sum + value, 0) / normalized.length;
  return clamp(average * 100, 0, 100);
};

export class MetricsEngine {
  private pubsub: PubSub;
  private intervals: Map<string, NodeJS.Timeout>;
  private state: Map<string, DrillingMetrics>;

  constructor(pubsub: PubSub, wells: Well[]) {
    this.pubsub = pubsub;
    this.intervals = new Map();
    this.state = new Map();
    wells.forEach((well) => {
      const seed = this.seedMetrics(well.id);
      this.state.set(well.id, seed);
    });
  }

  start() {
    if (this.intervals.size > 0) {
      return;
    }
    this.state.forEach((metrics, wellId) => {
      const interval = setInterval(() => {
        const updated = this.nextMetrics(metrics);
        this.state.set(wellId, updated);
        this.pubsub.publish(channel, { drillingMetrics: updated });
      }, 1000);
      this.intervals.set(wellId, interval);
    });
  }

  stop() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();
  }

  private seedMetrics(wellId: string): DrillingMetrics {
    const rop = (ranges.rop.max - ranges.rop.min) * 0.45;
    const torque = (ranges.torque.max - ranges.torque.min) * 0.55;
    const pressure = (ranges.pressure.max - ranges.pressure.min) * 0.65;
    const weightOnBit = (ranges.weightOnBit.max - ranges.weightOnBit.min) * 0.5;
    const base = { rop, torque, pressure, weightOnBit, wellId };
    return {
      ...base,
      efficiencyIndex: efficiency(base),
      timestamp: new Date().toISOString()
    };
  }

  private nextMetrics(previous: DrillingMetrics): DrillingMetrics {
    const rop = nextValue(previous.rop, ranges.rop.min, ranges.rop.max, ranges.rop.variance);
    const torque = nextValue(
      previous.torque,
      ranges.torque.min,
      ranges.torque.max,
      ranges.torque.variance
    );
    const pressure = nextValue(
      previous.pressure,
      ranges.pressure.min,
      ranges.pressure.max,
      ranges.pressure.variance
    );
    const weightOnBit = nextValue(
      previous.weightOnBit,
      ranges.weightOnBit.min,
      ranges.weightOnBit.max,
      ranges.weightOnBit.variance
    );
    const base = { rop, torque, pressure, weightOnBit, wellId: previous.wellId };
    return {
      ...base,
      efficiencyIndex: efficiency(base),
      timestamp: new Date().toISOString()
    };
  }
}

