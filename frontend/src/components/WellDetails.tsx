import { Well } from "../types";

interface Props {
  well?: Well | null;
}

export const WellDetails = ({ well }: Props) => {
  if (!well) {
    return (
      <div className="panel">
        <div className="panel-header">Well Details</div>
        <div className="placeholder">Select a well</div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-header">Well Details</div>
      <div className="well-details">
        <div>
          <div className="label">Name</div>
          <div className="value">{well.name}</div>
        </div>
        <div>
          <div className="label">Operator</div>
          <div className="value">{well.operator ?? "N/A"}</div>
        </div>
        <div>
          <div className="label">Field</div>
          <div className="value">{well.field ?? "N/A"}</div>
        </div>
        <div>
          <div className="label">Status</div>
          <div className="value">{well.status ?? "N/A"}</div>
        </div>
        <div>
          <div className="label">Depth (m)</div>
          <div className="value">{well.depth?.toLocaleString() ?? "N/A"}</div>
        </div>
        <div>
          <div className="label">Latitude</div>
          <div className="value">{well.latitude?.toFixed(4) ?? "N/A"}</div>
        </div>
        <div>
          <div className="label">Longitude</div>
          <div className="value">{well.longitude?.toFixed(4) ?? "N/A"}</div>
        </div>
      </div>
    </div>
  );
};


