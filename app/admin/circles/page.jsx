"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DataTable from "../../../components/admin/DataTable";
import { useRouter } from "next/navigation";

export default function CirclesPage() {
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter()
  
  // Modals state
  const [showModal, setShowModal] = useState(false);
  const [selectedCircleId, setSelectedCircleId] = useState(null); // For Add Member Modal

  // Form states
  const [formData, setFormData] = useState({ name: '', type: '', status: 'forming', startDate: '', endDate: '', description: '' });
  const [file, setFile] = useState(null);

  // Users state for Member Add
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // --- NEW: Notification State ---
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // --- NEW: Helper function to show notifications ---
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000); // Auto-hide after 3 seconds
  };

  const fetchCircles = async () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/admin/login");
      return;
    }
    try {
      const res = await fetch("/api/admin/circles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status == 401) {
        router.push("/admin/login");
        return;
      }

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
        showNotification("Circle created successfully!", "success");
        fetchCircles(); // Refresh list
      } else {
        const err = await res.json();
        const errMsg = err.errors ? JSON.stringify(err.errors) : (err.error || "Unknown error");
        showNotification("Error creating circle: " + errMsg, "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("Something went wrong while creating circle.", "error");
    }
  };

  const openAddMemberModal = async (circleId) => {
    setSelectedCircleId(circleId);
    setLoadingUsers(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("/api/admin/users", { 
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) setUsers(json.data || json); 
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAddMember = async (userId) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/circles/${selectedCircleId}/members`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ userId, status: "interested" }), 
      });
      if (res.ok) {
        showNotification("User added successfully with Interest status!", "success");
        setSelectedCircleId(null);
        fetchCircles(); 
      } else {
        const err = await res.json();
        const errMsg = err.errors ? JSON.stringify(err.errors) : (err.error || "Unknown error");
        showNotification("Error adding member: " + errMsg, "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("Something went wrong adding the member.", "error");
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
        <div className="flex gap-4 items-center">
          <Link href={`/admin/circles/${row.id}`} className="text-[#D48C71] font-bold hover:underline">
            Manage
          </Link>
          <button 
            onClick={() => openAddMemberModal(row.id)} 
            className="text-[#4B5E50] text-sm font-bold hover:underline"
          >
            + Add Member
          </button>
        </div>
    )}
  ];

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 relative">
      
      {/* Custom Popup Notification (Toast) */}
      {notification.show && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-lg text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-[#9FD62A] text-[#4B5E50]' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          )}
          {notification.message}
        </div>
      )}

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

      {/* Create Circle Modal */}
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

      {/* Add Member Modal */}
      {selectedCircleId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#4B5E50]">Add Users (Interest)</h2>
              <button onClick={() => setSelectedCircleId(null)} className="text-gray-500 hover:text-gray-800 font-bold">✕</button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2">
              {loadingUsers ? (
                <p className="text-sm text-gray-500 text-center py-4">Loading users...</p>
              ) : (
                <div className="space-y-3">
                  {users.length > 0 ? users.map((user) => (
                    <div key={user.id || user._id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <div>
                        <p className="text-sm font-bold text-[#4B5E50]">{user.name || user.firstName}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      <button
                        onClick={() => handleAddMember(user.id || user._id)}
                        className="bg-[#9FD62A]/20 text-[#4B5E50] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#9FD62A]/40 transition-colors"
                      >
                        Add (Interest)
                      </button>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-500 text-center">No users found.</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-end pt-6">
              <button type="button" onClick={() => setSelectedCircleId(null)} className="px-5 py-2 text-sm font-bold bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}