"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  // Updated Nav Items based on Admin Panel requirements
  const navItems = [
    { name: "Admin Dashboard", path: "/admin/dashboard" },
    { name: "Circle Management", path: "/admin/circles" },
    { name: "Vibe Checks", path: "/admin/vibe-checks" },
    // Keeping your existing ones
    { name: "Join Requests", path: "/admin/join-requests" },
    { name: "Get Started Meets", path: "/admin/get-started" },
    { name: "Meet People", path: "/admin/meet-people" },
    { name: "Footer Subscribers", path: "/admin/subscribers" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#4B5E50] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#3a4a3f] active:scale-95 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 md:w-64 bg-white min-h-screen border-r border-gray-100 flex flex-col pt-8 pb-6 px-6 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shadow-2xl md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D48C71] rounded-full flex items-center justify-center relative">
              <div className="w-5 h-5 bg-[#4B5E50] rounded-full absolute -top-1 -right-1 border-2 border-white"></div>
            </div>
            <h1 className="text-xl font-serif font-bold text-[#4B5E50] tracking-tight">Admin</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-xs font-bold text-gray-400 mb-4 px-2 tracking-widest uppercase">Management</p>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link key={item.path} href={item.path}>
                <span
                  className={`block px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                    isActive ? "bg-[#FDF6F4] text-[#D48C71] shadow-sm" : "text-[#4B5E50]/80 hover:bg-gray-50 hover:text-[#4B5E50]"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 flex items-center gap-2 px-4 py-3 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors rounded-2xl hover:bg-red-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </aside>
    </>
  );
}