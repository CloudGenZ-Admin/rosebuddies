"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "../../../../components/admin/DataTable";

export default function EventAttendancePage() {
  const { eventId } = useParams();
  const router = useRouter();
  
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Custom Notification State (Replaces alert)
  const [notification, setNotification] = useState({ show: false, message: "", type: "success" });

  // Custom Toast Notification Function
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
  };

  // Fetch attendees from your new GET endpoint
  const fetchAttendance = async () => {
    setLoading(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`/api/admin/events/${eventId}/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (res.ok) {
        // We ensure the EventAttendance object exists to avoid errors if missing
        const formattedData = json.data.map(user => ({
          ...user,
          EventAttendance: user.EventAttendance || { rsvpStatus: 'unknown', didAttend: false, noShowFlag: false }
        }));
        setAttendees(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch attendance details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) fetchAttendance();
  }, [eventId]);

  // Handle local state toggle for checkboxes
  const handleToggle = (userId, field, value) => {
    setAttendees(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          EventAttendance: {
            ...user.EventAttendance,
            [field]: value
          }
        };
      }
      return user;
    }));
  };

  // Submit bulk update to your new PUT endpoint
  const handleSaveChanges = async () => {
    setSaving(true);
    const token = localStorage.getItem("adminToken");
    
    // Format the payload as expected by the API
    const payload = {
      attendanceRecords: attendees.map(user => ({
        userId: user.id,
        didAttend: user.EventAttendance.didAttend,
        noShowFlag: user.EventAttendance.noShowFlag
      }))
    };

    try {
      const res = await fetch(`/api/admin/events/${eventId}/attendance`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        showNotification("Attendance updated successfully!");
        fetchAttendance(); // Refresh to confirm server state
      } else {
        const err = await res.json();
        showNotification("Failed to update: " + err.error, "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("An error occurred while saving.", "error");
    } finally {
      setSaving(false);
    }
  };

  // Define columns for our DataTable, using custom renders for checkboxes
  const columns = [
    { 
      header: "Member Name", 
      render: (row) => <span className="font-bold text-[#4B5E50]">{row.firstName} {row.lastName}</span> 
    },
    { 
      header: "Email", 
      key: "email" 
    },
    { 
      header: "RSVP Status", 
      render: (row) => (
        <span className="capitalize px-2 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500">
          {row.EventAttendance.rsvpStatus}
        </span>
      )
    },
    { 
      header: "Did Attend", 
      render: (row) => (
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={row.EventAttendance.didAttend} 
            onChange={(e) => handleToggle(row.id, 'didAttend', e.target.checked)}
            className="w-5 h-5 accent-[#9FD62A] rounded cursor-pointer"
          />
        </label>
      )
    },
    { 
      header: "No-Show Flag", 
      render: (row) => (
        <label className="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={row.EventAttendance.noShowFlag} 
            onChange={(e) => handleToggle(row.id, 'noShowFlag', e.target.checked)}
            className="w-5 h-5 accent-red-500 rounded cursor-pointer"
          />
        </label>
      )
    }
  ];

  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 relative">
      
      {/* --- CUSTOM TOAST NOTIFICATION --- */}
      {notification.show && (
        <div className={`fixed top-8 right-8 z-50 px-6 py-3 rounded-xl font-bold text-sm shadow-xl transition-all duration-300 animate-in slide-in-from-top-5 ${
          notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-[#4B5E50] text-white'
        }`}>
          {notification.message}
        </div>
      )}

      <button 
        onClick={() => router.back()} 
        className="text-sm font-bold text-gray-400 hover:text-[#D48C71] flex items-center gap-2 mb-6 transition-colors"
      >
        &larr; Back
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">
            Event Attendance
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Track who showed up and flag repeated no-shows.
          </p>
        </div>
        
        <button 
          onClick={handleSaveChanges}
          disabled={saving || attendees.length === 0}
          className="bg-[#4B5E50] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#3a4a3f] disabled:opacity-50 transition-all shadow-sm"
        >
          {saving ? "Saving..." : "Save Attendance"}
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <DataTable columns={columns} data={attendees} loading={loading} />
        
        {!loading && attendees.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No attendees found for this event yet. Members need to be added to the event.
          </p>
        )}
      </div>
    </div>
  );
}