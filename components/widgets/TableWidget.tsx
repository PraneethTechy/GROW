"use client";

export default function TableWidget({ data }: { data: any }) {
  if (!data) return null;

  const rows = Object.entries(data)
    .slice(0, 5)
    .map(([date, v]: any) => ({
      date,
      open: v["1. open"],
      high: v["2. high"],
      low: v["3. low"],
      close: v["4. close"],
    }));

  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full text-sm border border-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Open</th>
            <th className="p-2">High</th>
            <th className="p-2">Low</th>
            <th className="p-2">Close</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.date} className="border-t border-gray-700">
              <td className="p-2">{row.date}</td>
              <td className="p-2">${row.open}</td>
              <td className="p-2">${row.high}</td>
              <td className="p-2">${row.low}</td>
              <td className="p-2">${row.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
