"use client";
import { useEffect, useState, useMemo } from "react";
import DataTable from "../../../components/admin/DataTable";

export default function VibeChecksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to toggle between views
  const [view, setView] = useState("overview"); // "overview" | "individual"

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

  // EXACT same implementation for charts + fallback support for your new API
  const stats = useMemo(() => {
    const counts = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} };
    data.forEach(row => {
      // Support for new API format (if backend sends step1, step2...)
      if (row.step1 !== undefined && !row.answers) {
        for (let i = 1; i <= 5; i++) {
          if (row[`step${i}`] && row[`step${i}`] !== "-") {
             row[`step${i}`].split(", ").forEach(ans => {
                counts[i][ans] = (counts[i][ans] || 0) + 1;
             });
          }
        }
        return;
      }

      // Exact original logic for answers array
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

  // Transform data for the DataTable (Ensures flat rows even if backend uses old format)
  const tableData = useMemo(() => {
    return data.map(row => {
      if (row.step1 !== undefined) return row; // Already flattened by backend

      // Fallback: flatten it on frontend if backend didn't do it
      let parsed = row.answers;
      if (typeof parsed === 'string') {
        try { parsed = JSON.parse(parsed); } catch(e) {}
      }
      const flatRow = { ...row, step1: "-", step2: "-", step3: "-", step4: "-", step5: "-" };
      if (Array.isArray(parsed)) {
        parsed.forEach(q => {
          if (q.question && q.responses) {
            flatRow[`step${q.question}`] = q.responses.join(", ");
          }
        });
      }
      return flatRow;
    });
  }, [data]);

  // EXACT same UI implementation for rendering charts
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

  // DataTable columns
  const columns = [
    { header: "ID", key: "id" },
    { 
      header: "Date", 
      key: "createdAt",
      render: (row) => new Date(row.createdAt).toLocaleDateString("en-US", {
        year: 'numeric', month: 'short', day: 'numeric'
      })
    },
    { header: "Q1: Ideal Time", key: "step1" },
    { header: "Q2: Hoping to Find", key: "step2" },
    { header: "Q3: Social Setting", key: "step3" },
    { header: "Q4: Chapter", key: "step4" },
    { header: "Q5: Excited For", key: "step5" },
  ];

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">Vibe Checks</h1>
        <p className="text-sm sm:text-base text-gray-500">Aggregate analytics from the anonymous Vibe Check quiz.</p>
      </div>

      {/* NEW: Toggle Switch Buttons */}
      <div className="flex  bg-gray-100 p-1.5 rounded-xl w-fit mb-8 shadow-inner border border-gray-200/50">
        <button
          onClick={() => setView("overview")}
          className={`px-5 py-2.5 cursor-pointer rounded-lg text-sm font-bold transition-all duration-300 ${
            view === "overview" 
              ? "bg-white text-[#4B5E50] shadow-sm" 
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Overview Analytics
        </button>
        <button
          onClick={() => setView("individual")}
          className={`px-5 py-2.5 cursor-pointer rounded-lg text-sm font-bold transition-all duration-300 ${
            view === "individual" 
              ? "bg-white text-[#4B5E50] shadow-sm" 
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Individual Responses
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 font-semibold animate-pulse">Loading data...</p>
      ) : data.length > 0 ? (
        
        <div className="mb-10 transition-all">
          {/* VIEW 1: Charts (Exact Original Implementation) */}
          {view === "overview" && (
            <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {renderChart(1, "Q1: Ideal Time")}
              {renderChart(2, "Q2: Hoping to Find")}
              {renderChart(3, "Q3: Social Setting")}
              {renderChart(4, "Q4: Current Chapter")}
              {renderChart(5, "Q5: Excited For")}
            </div>
          )}

          {/* VIEW 2: Data Table */}
          {view === "individual" && (
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
              <DataTable columns={columns} data={tableData} loading={loading} />
            </div>
          )}
        </div>

      ) : (
        <p className="text-gray-500 bg-white p-6 rounded-2xl border-2 border-gray-100 w-fit">
          No vibe checks have been submitted yet.
        </p>
      )}
    </div>
  );
}