"use client";
import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/DataTable";

export default function JoinRequestsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch("/api/admin/join-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const json = await res.json();
        if (res.ok) {
          setData(json.data);
        }
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
    { header: "Email", key: "email" },
    { header: "City", key: "city" },
    { 
      header: "Date Applied", 
      key: "createdAt",
      render: (row) => new Date(row.createdAt).toLocaleDateString("en-US", {
        year: 'numeric', month: 'short', day: 'numeric'
      })
    },
  ];

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">Join Requests</h1>
        <p className="text-sm sm:text-base text-gray-500">View and manage people waiting to join the circle.</p>
      </div>
      <DataTable columns={columns} data={data} loading={loading} />
    </div>
  );
}