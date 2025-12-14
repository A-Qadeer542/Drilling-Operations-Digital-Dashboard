import { useEffect, useMemo, useState } from "react";
import { useSubscription } from "@apollo/client";
import { DRILLING_METRICS } from "../graphql/queries";
import { DrillingMetrics } from "../types";

interface SubscriptionData {
  drillingMetrics: DrillingMetrics;
}

const windowMs = 60 * 1000;

export const useDrillingMetrics = (wellId?: string | null) => {
  const [series, setSeries] = useState<DrillingMetrics[]>([]);

  const { data } = useSubscription<SubscriptionData>(DRILLING_METRICS, {
    variables: { wellId },
    skip: !wellId
  });

  useEffect(() => {
    setSeries([]);
  }, [wellId]);

  useEffect(() => {
    if (!data?.drillingMetrics) {
      return;
    }
    setSeries((prev) => {
      const next = [...prev, data.drillingMetrics];
      const cutoff = Date.now() - windowMs;
      return next.filter(
        (item) => new Date(item.timestamp).getTime() >= cutoff
      );
    });
  }, [data]);

  const latest = useMemo(
    () => (series.length ? series[series.length - 1] : undefined),
    [series]
  );

  return { latest, series };
};


