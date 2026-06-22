"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save token and redirect
      localStorage.setItem("adminToken", data.token);
      router.push("/admin/join-requests"); // Default dashboard page
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-sm p-10 w-full max-w-md border border-gray-50">
        
        {/* Logo Graphic */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-[#D48C71] rounded-full flex items-center justify-center relative">
            <div className="w-8 h-8 bg-[#4B5E50] rounded-full absolute -top-1 -right-1 border-4 border-white"></div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#4B5E50] mb-2">Admin Access</h1>
          <p className="text-sm text-gray-500">Enter your credentials to access the garden.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#F8F7F5] border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#D48C71] outline-none transition-all placeholder:text-gray-400 text-gray-700"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8F7F5] border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#D48C71] outline-none transition-all placeholder:text-gray-400 text-gray-700"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D48C71] hover:bg-[#c27c62] text-white font-semibold rounded-2xl px-5 py-4 mt-2 transition-colors disabled:opacity-50"
          >
            {loading ? "Entering..." : "Enter Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}