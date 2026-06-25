"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "../../../../components/admin/DataTable";

export default function CircleDetailsPage() {
  const { circleId } = useParams();
  const router = useRouter();
  const [circle, setCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details"); // details, members, events

  // Sub-forms states
  const [newMemberId, setNewMemberId] = useState("");
  const [eventData, setEventData] = useState({ title: '', date: '', location: '', description: '', capacity: '', price: '' });
  const [eventFile, setEventFile] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchCircle = async () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/circles/${circleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) {
        setCircle(json.data);
        setEditFormData({
          name: json.data.name,
          type: json.data.type,
          status: json.data.status,
          startDate: json.data.startDate?.split('T')[0] || '',
          endDate: json.data.endDate?.split('T')[0] || '',
          description: json.data.description || ''
        });
      }
    } catch (error) {
      console.error("Failed to fetch circle details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (circleId) fetchCircle();
  }, [circleId]);

  // --- API Handlers ---

  const handleUpdateCircle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const data = new FormData();
    Object.keys(editFormData).forEach(key => data.append(key, editFormData[key]));

    const res = await fetch(`/api/admin/circles/${circleId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.ok) {
      alert("Circle updated!");
      fetchCircle();
    } else {
      alert("Failed to update circle.");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`/api/admin/circles/${circleId}/members`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ userId: newMemberId }),
    });
    if (res.ok) {
      setNewMemberId("");
      fetchCircle();
    } else {
      const err = await res.json();
      alert(err.error || "Failed to add member");
    }
  };

  const handleRemoveMember = async (userId) => {
    if (!confirm("Remove this member?")) return;
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`/api/admin/circles/${circleId}/members?userId=${userId}&exitReason=Admin Removed`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchCircle();
    else alert("Failed to remove member");
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const data = new FormData();
    Object.keys(eventData).forEach(key => data.append(key, eventData[key]));
    if (eventFile) data.append("eventImg", eventFile);

    const res = await fetch(`/api/admin/circles/${circleId}/events`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (res.ok) {
      setEventData({ title: '', date: '', location: '', description: '', capacity: '', price: '' });
      setEventFile(null);
      fetchCircle();
    } else {
      alert("Failed to create event");
    }
  };

  // --- Data Table Configurations ---
  
  const memberColumns = [
    { header: "Name", render: (row) => `${row.firstName} ${row.lastName}` },
    { header: "Email", key: "email" },
    { header: "Status", render: (row) => row.CircleMember?.status || 'active' },
    { header: "Actions", render: (row) => (
        <button onClick={() => handleRemoveMember(row.id)} className="text-red-500 font-bold hover:underline text-xs">
          Remove
        </button>
    )}
  ];

  // UPDATED EVENT COLUMNS: Added the Attendance Link
  const eventColumns = [
    { header: "Date", render: (row) => new Date(row.date).toLocaleString() },
    { header: "Title", key: "title", render: (row) => <span className="font-bold text-[#4B5E50]">{row.title}</span> },
    { header: "Location", key: "location" },
    { header: "Capacity", key: "capacity" },
    { 
      header: "Actions", 
      render: (row) => (
        <Link 
          href={`/admin/events/${row.id}`} 
          className="text-[#D48C71] font-bold hover:bg-[#FDF6F4] px-3 py-2 rounded-lg text-xs transition-colors inline-block"
        >
          Manage Attendance &rarr;
        </Link>
      )
    }
  ];

  if (loading) return <div className="p-10 text-center text-gray-500">Loading circle data...</div>;
  if (!circle) return <div className="p-10 text-center text-red-500">Circle not found.</div>;

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 relative">
      <Link href="/admin/circles" className="text-sm font-bold text-gray-400 hover:text-[#D48C71] flex items-center gap-2 mb-4 transition-colors">
        &larr; Back to Circles
      </Link>
      
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">{circle.name}</h1>
        <p className="text-sm sm:text-base text-gray-500 capitalize">{circle.type} Circle • Status: {circle.status}</p>
      </div>

      {/* TABS */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {['details', 'members', 'events'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-sm font-bold capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-[#D48C71] text-[#D48C71]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DETAILS TAB */}
      {activeTab === "details" && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl">
          <h2 className="text-lg font-bold text-[#4B5E50] mb-4">Edit Circle Info</h2>
          <form onSubmit={handleUpdateCircle} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Name</label>
              <input type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Status</label>
                <select value={editFormData.status} onChange={e => setEditFormData({...editFormData, status: e.target.value})} className="w-full border rounded-xl p-3 text-sm">
                  <option value="forming">Forming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Type</label>
                <input type="text" value={editFormData.type} onChange={e => setEditFormData({...editFormData, type: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Start Date</label>
                <input type="date" value={editFormData.startDate} onChange={e => setEditFormData({...editFormData, startDate: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">End Date</label>
                <input type="date" value={editFormData.endDate} onChange={e => setEditFormData({...editFormData, endDate: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
              <textarea rows="3" value={editFormData.description} onChange={e => setEditFormData({...editFormData, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm"></textarea>
            </div>
            <button type="submit" className="bg-[#4B5E50] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#3a4a3f]">Save Changes</button>
          </form>
        </div>
      )}

      {/* MEMBERS TAB */}
      {activeTab === "members" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-500 mb-1">Add Member by User ID</label>
              <input type="text" placeholder="Enter user UUID..." value={newMemberId} onChange={e => setNewMemberId(e.target.value)} className="w-full border rounded-xl p-3 text-sm" />
            </div>
            <button onClick={handleAddMember} className="bg-[#D48C71] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#c27a60]">Add</button>
          </div>
          <DataTable columns={memberColumns} data={circle.members} loading={false} />
        </div>
      )}

      {/* EVENTS TAB */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <h2 className="text-lg font-bold text-[#4B5E50] mb-4">Schedule New Event</h2>
             <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <input required type="text" placeholder="Event Title" value={eventData.title} onChange={e => setEventData({...eventData, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
                <input required type="datetime-local" value={eventData.date} onChange={e => setEventData({...eventData, date: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
                <input required type="text" placeholder="Location" value={eventData.location} onChange={e => setEventData({...eventData, location: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
                <input type="number" placeholder="Capacity (opt)" value={eventData.capacity} onChange={e => setEventData({...eventData, capacity: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
                <input type="number" step="0.01" placeholder="Price (opt)" value={eventData.price} onChange={e => setEventData({...eventData, price: e.target.value})} className="w-full border rounded-xl p-3 text-sm" />
                <input type="file" accept="image/*" onChange={e => setEventFile(e.target.files[0])} className="w-full text-sm pt-2" />
                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="bg-[#D48C71] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#c27a60]">Create Event</button>
                </div>
             </form>
          </div>
          {/* Renders the Events Table with the newly added Actions button */}
          <DataTable columns={eventColumns} data={circle.events} loading={false} />
        </div>
      )}

    </div>
  );
}