import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { DrillingMetrics } from "../types";

interface Props {
  data: DrillingMetrics[];
}

const formatTime = (value: string) =>
  new Date(value).toLocaleTimeString(undefined, { hour12: false });

export const MetricsChart = ({ data }: Props) => (
  <div className="panel">
    <div className="panel-header">Live Metrics (60s)</div>
    <div className="chart">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid stroke="#2c2f38" strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            stroke="#7f8694"
          />
          <YAxis stroke="#7f8694" />
          <Tooltip
            labelFormatter={(value) => formatTime(value as string)}
            contentStyle={{ background: "#0e1016", border: "1px solid #2f3340" }}
          />
          <Legend />
          <Line type="monotone" dataKey="rop" stroke="#36cfc9" dot={false} />
          <Line type="monotone" dataKey="torque" stroke="#ff9f43" dot={false} />
          <Line type="monotone" dataKey="pressure" stroke="#e350a3" dot={false} />
          <Line
            type="monotone"
            dataKey="weightOnBit"
            stroke="#81d26c"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);


