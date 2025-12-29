"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartWidget({ data }: { data: any }) {
  if (!data || typeof data !== "object") return null;

  // ✅ Convert object → sorted array (oldest → newest)
  const chartData = Object.entries(data)
    .map(([date, v]: any) => ({
      date,
      close: Number(v?.["4. close"]),
    }))
    .filter((d) => !isNaN(d.close))
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .slice(-15); // ✅ last 15 trading days

  if (chartData.length === 0) return null;

  return (
    <div className="h-56 mt-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {/* Hide X labels but keep spacing */}
          <XAxis dataKey="date" hide />

          {/* ✅ Better Y-axis scaling */}
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* ✅ Styled tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(value: number | undefined) => [`$${value ?? 0}`, "Close"]}
          />

          {/* ✅ Smooth stock-style line */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
