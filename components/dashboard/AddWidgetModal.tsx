"use client";

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { v4 as uuid } from "uuid";

export default function AddWidgetModal({ onClose }: { onClose: () => void }) {
  const addWidget = useDashboardStore((s) => s.addWidget);
  const [symbol, setSymbol] = useState("AAPL");

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"card" | "table" | "chart">("card");
  const [apiUrl, setApiUrl] = useState("");
const [refreshInterval, setRefreshInterval] = useState(30);
const [testStatus, setTestStatus] = useState("");


  const handleAdd = () => {
    if (!title) return;

    addWidget({
  id: uuid(),
  title,
  type,
  symbol,
  apiUrl,
  refreshInterval,
});


    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Widget</h2>
        
        <input
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Widget Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
  className="w-full p-2 mb-3 rounded bg-gray-700"
  placeholder="API URL (optional)"
  value={apiUrl}
  onChange={(e) => setApiUrl(e.target.value)}
/>

<button
  type="button"
  onClick={async () => {
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error();
      setTestStatus("API connection successful");
    } catch {
      setTestStatus("API connection failed");
    }
  }}
  className="mb-3 px-3 py-1 bg-blue-600 rounded"
>
  Test API
</button>

{testStatus && (
  <p className="text-sm text-green-400 mb-2">{testStatus}</p>
)}

<input
  type="number"
  className="w-full p-2 mb-3 rounded bg-gray-700"
  placeholder="Refresh Interval (seconds)"
  value={refreshInterval}
  onChange={(e) => setRefreshInterval(Number(e.target.value))}
  min={5}
/>



        <input
  className="w-full p-2 mb-3 rounded bg-gray-700"
  placeholder="Stock Symbol (AAPL, MSFT)"
  value={symbol}
  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
/>



        <select
          className="w-full p-2 mb-4 rounded bg-gray-700"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option value="card">Finance Card</option>
          <option value="table">Table</option>
          <option value="chart">Chart</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 bg-gray-600 rounded">
            Cancel
          </button>
          <button onClick={handleAdd} className="px-3 py-1 bg-green-600 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
