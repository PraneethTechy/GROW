"use client";

import { useEffect, useRef, useState } from "react";

export function useFinanceApi(symbol?: string, apiUrl?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!symbol || hasFetched.current) return;
    hasFetched.current = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const url =
          apiUrl && apiUrl.length > 0
            ? apiUrl
            : `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY}`;

        const res = await fetch(url);
        const json = await res.json();

        if (json["Error Message"] || json["Note"]) {
          throw new Error("API limit reached or invalid symbol");
        }

        // ✅ Always normalize to Time Series (Daily)
        setData(json["Time Series (Daily)"]);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [symbol, apiUrl]);

  return { data, loading, error };
}
