"use client";
import { useEffect, useState, useMemo } from "react";
import DataTable from "../../../components/admin/DataTable";

export default function VibeChecksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch("/api/admin/vibe-checks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok) setData(json.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const counts = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
    data.forEach(row => {
      let parsed = row.answers;
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch(e) {}
      }
      if (Array.isArray(parsed)) {
        parsed.forEach(q => {
          if (q.question && q.responses) {
            const qId = String(q.question);
            if (counts[qId]) {
              q.responses.forEach(ans => {
                counts[qId][ans] = (counts[qId][ans] || 0) + 1;
              });
            }
          }
        });
      }
    });
    return counts;
  }, [data]);

  const renderChart = (qId, title) => {
    const qStats = stats[String(qId)];
    const items = Object.entries(qStats).sort((a, b) => b[1] - a[1]);
    const max = items.length > 0 ? Math.max(...items.map(i => i[1])) : 1;
    
    if (items.length === 0) return null;

    return (
      <div className="bg-white p-5 rounded-2xl border-2 border-gray-100 shadow-sm flex-1 min-w-[300px]">
        <h3 className="text-sm font-bold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-3">
          {items.map(([label, count], idx) => (
            <div key={idx} className="relative">
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
                <span className="truncate pr-4">{label}</span>
                <span>{count}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-[#9FD62A] h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(count / max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">Vibe Checks</h1>
        <p className="text-sm sm:text-base text-gray-500">Aggregate analytics from the anonymous Vibe Check quiz.</p>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading analytics...</p>
      ) : data.length > 0 ? (
        <div className="mb-10">
          <div className="flex flex-wrap gap-4">
            {renderChart(1, "Q1: Ideal Time")}
            {renderChart(2, "Q2: Hoping to Find")}
            {renderChart(3, "Q3: Social Setting")}
            {renderChart(4, "Q4: Current Chapter")}
            {renderChart(5, "Q5: Excited For")}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No vibe checks have been submitted yet.</p>
      )}
    </div>
  );
}