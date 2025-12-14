import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_WELLS } from "../graphql/queries";
import { Well } from "../types";
import { WellList } from "../components/WellList";
import { WellDetails } from "../components/WellDetails";
import { MetricsCards } from "../components/MetricsCards";
import { MetricsChart } from "../components/MetricsChart";
import { AlertPanel } from "../components/AlertPanel";
import { useDrillingMetrics } from "../hooks/useDrillingMetrics";

interface WellsData {
  wells: Well[];
}

export const Dashboard = () => {
  const { data, loading } = useQuery<WellsData>(GET_WELLS);
  const [selectedWellId, setSelectedWellId] = useState<string | null>(null);
  const { latest, series } = useDrillingMetrics(selectedWellId);

  useEffect(() => {
    if (data?.wells && data.wells.length && !selectedWellId) {
      setSelectedWellId(data.wells[0].id);
    }
  }, [data, selectedWellId]);

  const selectedWell = useMemo(
    () => data?.wells.find((well) => well.id === selectedWellId) ?? null,
    [data, selectedWellId]
  );

  return (
    <div className="layout">
      <div className="sidebar">
        {loading ? (
          <div className="panel">
            <div className="panel-header">Wells</div>
            <div className="placeholder">Loading...</div>
          </div>
        ) : (
          <WellList
            wells={data?.wells ?? []}
            selectedId={selectedWellId}
            onSelect={setSelectedWellId}
          />
        )}
        <WellDetails well={selectedWell} />
      </div>
      <div className="content">
        <MetricsCards metrics={latest} />
        <div className="grid two">
          <MetricsChart data={series} />
          <AlertPanel metrics={latest} />
        </div>
      </div>
    </div>
  );
};


