import { Well } from "../types";

interface Props {
  wells: Well[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
}

export const WellList = ({ wells, selectedId, onSelect }: Props) => (
  <div className="panel">
    <div className="panel-header">Wells</div>
    <div className="well-list">
      {wells.map((well) => (
        <button
          key={well.id}
          className={selectedId === well.id ? "well-item active" : "well-item"}
          onClick={() => onSelect(well.id)}
        >
          <div className="well-name">{well.name}</div>
          <div className="well-meta">{well.field}</div>
        </button>
      ))}
    </div>
  </div>
);


