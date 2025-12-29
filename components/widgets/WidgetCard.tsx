"use client";

import { useDashboardStore } from "@/store/dashboardStore";
import { useFinanceApi } from "@/hooks/useFinanceApi";
import ChartWidget from "./ChartWidget";
import TableWidget from "./TableWidget";

export default function WidgetCard({ widget, dragHandleProps }: any) {
  const removeWidget = useDashboardStore((s) => s.removeWidget);
  const { data, loading, error } = useFinanceApi(
    widget.symbol,
    widget.apiUrl
  );

  let price = "N/A";
  if (data) {
    const dates = Object.keys(data);
    if (dates.length > 0) {
      price = Number(data[dates[0]]["4. close"]).toFixed(2);
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div {...dragHandleProps} className="cursor-move text-gray-400 text-sm">
          ⠿
        </div>

        <h2 className="font-semibold flex-1 text-center">
          {widget.title}
        </h2>

        <button
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          onClick={(e) => {
            e.stopPropagation();
            removeWidget(widget.id);
          }}
          className="text-red-400 cursor-pointer"
        >
          ✕
        </button>
      </div>

      {loading && <p className="text-sm">Loading...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && widget.type === "card" && (
        <p className="text-lg mt-2">
          {widget.symbol}: ${price}
        </p>
      )}

      {!loading && !error && widget.type === "chart" && (
        <ChartWidget data={data} />
      )}

      {!loading && !error && widget.type === "table" && (
        <TableWidget data={data} />
      )}
    </div>
  );
}
