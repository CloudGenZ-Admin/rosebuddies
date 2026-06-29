"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "../../../components/admin/DataTable";

export default function CirclesPage() {
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: '', type: '', status: 'forming', startDate: '', endDate: '', description: '' });
  const [file, setFile] = useState(null);

  const fetchCircles = async () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/admin/circles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) setCircles(json.data);
    } catch (error) {
      console.error("Failed to fetch circles", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCircles();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append("img", file);

    try {
      const res = await fetch("/api/admin/circles", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ name: '', type: '', status: 'forming', startDate: '', endDate: '', description: '' });
        setFile(null);
        fetchCircles(); // Refresh list
      } else {
        const err = await res.json();
        alert("Error creating circle: " + JSON.stringify(err.errors || err.error));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const columns = [
    { header: "Circle Name", key: "name", render: (row) => <span className="font-bold text-[#4B5E50]">{row.name}</span> },
    { header: "Type", key: "type", render: (row) => <span className="capitalize">{row.type}</span> },
    { header: "Status", key: "status", render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.status === 'active' ? 'bg-[#9FD62A]/20 text-[#4B5E50]' : 'bg-gray-100 text-gray-500'}`}>
          {row.status}
        </span>
    )},
    { header: "Members", render: (row) => row.members?.length || 0 },
    { header: "Events", render: (row) => row.events?.length || 0 },
    { header: "Actions", render: (row) => (
        <Link href={`/admin/circles/${row.id}`} className="text-[#D48C71] font-bold hover:underline">
          Manage
        </Link>
    )}
  ];

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">Circle Management</h1>
          <p className="text-sm sm:text-base text-gray-500">Create, edit, and manage group circles.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#D48C71] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#c27a60] transition-colors"
        >
          + Create New Circle
        </button>
      </div>

      <DataTable columns={columns} data={circles} loading={loading} />

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-serif font-bold text-[#4B5E50] mb-6">Create Circle</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Type</label>
                  <input required type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border rounded-xl p-3 text-sm" placeholder="e.g. social, study" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full border rounded-xl p-3 text-sm">
                    <option value="forming">Forming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Start Date</label>
                  <input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">End Date</label>
                  <input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Image Banner</label>
                <input type="file" onChange={e => setFile(e.target.files[0])} className="w-full text-sm" accept="image/*" />
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800">Cancel</button>
                <button type="submit" className="bg-[#4B5E50] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#3a4a3f]">Create Circle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}