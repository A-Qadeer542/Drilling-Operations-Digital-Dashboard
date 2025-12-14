import { DrillingMetrics } from "../types";

interface Props {
  metrics?: DrillingMetrics;
}

const level = (value: number, low: number, high: number) => {
  if (value < low * 0.9 || value > high * 1.1) return "critical";
  if (value < low || value > high) return "warning";
  return "good";
};

const label = (state: string) =>
  state === "good" ? "Green" : state === "warning" ? "Yellow" : "Red";

const colorClass = (state: string) =>
  state === "good" ? "status good" : state === "warning" ? "status warn" : "status bad";

export const AlertPanel = ({ metrics }: Props) => {
  if (!metrics) {
    return (
      <div className="panel">
        <div className="panel-header">Alerts</div>
        <div className="placeholder">Awaiting data</div>
      </div>
    );
  }

  const ropState = level(metrics.rop, 8, 50);
  const torqueState = level(metrics.torque, 7, 32);
  const pressureState = level(metrics.pressure, 170, 320);
  const wobState = level(metrics.weightOnBit, 7, 33);
  const efficiencyState =
    metrics.efficiencyIndex < 45
      ? "critical"
      : metrics.efficiencyIndex < 60
      ? "warning"
      : "good";

  return (
    <div className="panel">
      <div className="panel-header">Alerts</div>
      <div className="alerts">
        <div className={colorClass(ropState)}>
          <div className="label">ROP</div>
          <div className="value">{label(ropState)}</div>
        </div>
        <div className={colorClass(torqueState)}>
          <div className="label">Torque</div>
          <div className="value">{label(torqueState)}</div>
        </div>
        <div className={colorClass(pressureState)}>
          <div className="label">Standpipe Pressure</div>
          <div className="value">{label(pressureState)}</div>
        </div>
        <div className={colorClass(wobState)}>
          <div className="label">Weight on Bit</div>
          <div className="value">{label(wobState)}</div>
        </div>
        <div className={colorClass(efficiencyState)}>
          <div className="label">Efficiency</div>
          <div className="value">{label(efficiencyState)}</div>
        </div>
      </div>
    </div>
  );
};


