"use client";
import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/DataTable";

export default function SubscribersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch("/api/admin/footer-subscribers", {
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
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { 
      header: "Message", 
      key: "message",
      render: (row) => row.message ? (
        <span className="block truncate max-w-[150px] sm:max-w-xs md:max-w-sm lg:max-w-md" title={row.message}>
          {row.message}
        </span>
      ) : <span className="text-gray-400 italic">None</span>
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
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">Newsletter Subscribers</h1>
        <p className="text-sm sm:text-base text-gray-500">Users who subscribed from the footer.</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}