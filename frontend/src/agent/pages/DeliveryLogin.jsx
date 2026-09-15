import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agentLogin } from "../../services/api";

export default function DeliveryLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await agentLogin(email, password);
      if (res.ok) {
        localStorage.setItem("agent", JSON.stringify(res.data.data));
        // Also set user with type=agent for route guard
        localStorage.setItem("user", JSON.stringify({ type: "agent", data: res.data.data }));
        navigate("/agent/dashboard");
      } else {
        setError(res.data?.error || "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b2a4a] to-[#1e4f7a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black">
            <span className="text-white">1</span>
            <span className="text-red-400">0</span>
            <span className="text-green-400">0</span>
          </h1>
          <p className="text-slate-300 text-sm mt-2 font-medium">Delivery Agent Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Delivery Login</h2>
          <p className="text-slate-500 text-sm mb-6">Sign in to access your delivery assignments</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
              <input
                type="email"
                required
                placeholder="agent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 mt-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-sm hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-60 shadow-lg mt-2"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">
          Contact your admin if you've forgotten your credentials.
        </p>
      </div>
    </div>
  );
}
