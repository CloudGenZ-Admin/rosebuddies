"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Don't run auth check on the login page itself
    if (pathname === "/admin/login") return;

    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#F8F7F5]">{children}</div>;
  }

  if (!isAuthenticated) return null; // Prevent hydration flash

  return (
    <div className="flex min-h-screen bg-[#F8F7F5] font-sans text-[#3A4035]">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}