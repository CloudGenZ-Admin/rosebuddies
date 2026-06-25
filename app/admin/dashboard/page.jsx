"use client";

export default function AdminDashboardPage() {
  return (
    <div className="w-full pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#4B5E50] mb-2">Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-500">At-a-glance overview of platform activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Active Circles</h3>
          <p className="text-4xl font-serif font-bold text-[#4B5E50]">12</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Total Members</h3>
          <p className="text-4xl font-serif font-bold text-[#D48C71]">348</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Upcoming Events</h3>
          <p className="text-4xl font-serif font-bold text-[#9FD62A]">24</p>
        </div>
      </div>
    </div>
  );
}