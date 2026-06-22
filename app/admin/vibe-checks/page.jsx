"use client";
import { useEffect, useState } from "react";
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

  const columns = [
    { header: "ID", key: "id" },
    { 
      header: "Answers", 
      key: "answers",
      render: (row) => (
        <div 
          className="block truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100" 
          title={JSON.stringify(row.answers)}
        >
          {typeof row.answers === 'object' ? JSON.stringify(row.answers) : row.answers}
        </div>
      )
    },
    { 
      header: "Date", 
      key: "createdAt",
      render: (row) => new Date(row.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })
    },
  ];

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">Vibe Checks</h1>
        <p className="text-sm sm:text-base text-gray-500">Form responses from the Vibe Check quiz.</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}