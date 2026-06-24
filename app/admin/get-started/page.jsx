"use client";
import { useEffect, useState } from "react";
import DataTable from "../../../components/admin/DataTable";

export default function GetStartedPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state variables for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search input to prevent excessive API calls while typing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedQuery(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Fetch data from API, now reacting to the debounced search query
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      try {
        // Construct URL with or without search query
        const url = debouncedQuery 
          ? `/api/admin/get-started-meets?search=${encodeURIComponent(debouncedQuery)}`
          : "/api/admin/get-started-meets";

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [debouncedQuery]);

  const columns = [
    { header: "ID", key: "id" },
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { header: "City", key: "city" },
    { header: "Vibe", key: "vibe" },
    { 
      header: "Date", 
      key: "createdAt",
      render: (row) => new Date(row.createdAt).toLocaleDateString("en-US", { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    },
  ];

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 flex flex-col min-h-screen">
      
      {/* Responsive Header & Search Bar Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
        
        {/* Title Area */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">
            Get Started Meets
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Users who have submitted the Get Started flow.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 lg:w-96 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {/* Search Icon */}
            <svg 
              className="h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#4B5E50] focus:border-[#4B5E50] sm:text-sm transition-all duration-200 shadow-sm"
          />
        </div>

      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
        <DataTable columns={columns} data={data} loading={loading} />
      </div>
      
    </div>
  );
}