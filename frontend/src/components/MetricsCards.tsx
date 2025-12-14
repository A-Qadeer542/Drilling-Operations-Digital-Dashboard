import { DrillingMetrics } from "../types";

interface Props {
  metrics?: DrillingMetrics;
}

const format = (value?: number, digits = 1) =>
  value !== undefined ? value.toFixed(digits) : "–";

export const MetricsCards = ({ metrics }: Props) => (
  <div className="grid">
    <div className="kpi">
      <div className="kpi-label">ROP</div>
      <div className="kpi-value">{format(metrics?.rop)}</div>
      <div className="kpi-unit">m/hr</div>
    </div>
    <div className="kpi">
      <div className="kpi-label">Torque</div>
      <div className="kpi-value">{format(metrics?.torque)}</div>
      <div className="kpi-unit">kNm</div>
    </div>
    <div className="kpi">
      <div className="kpi-label">Standpipe Pressure</div>
      <div className="kpi-value">{format(metrics?.pressure, 0)}</div>
      <div className="kpi-unit">bar</div>
    </div>
    <div className="kpi">
      <div className="kpi-label">Weight on Bit</div>
      <div className="kpi-value">{format(metrics?.weightOnBit)}</div>
      <div className="kpi-unit">tonnes</div>
    </div>
    <div className="kpi accent">
      <div className="kpi-label">Efficiency Index</div>
      <div className="kpi-value">
        {metrics ? metrics.efficiencyIndex.toFixed(0) : "–"}%
      </div>
      <div className="kpi-unit">live</div>
    </div>
  </div>
);


