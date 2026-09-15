import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { LayoutDashboard, LogOut, UserCircle, Menu, X } from "lucide-react";

export default function AgentLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const agentStr = localStorage.getItem("agent");
  let agent = null;
  try { agent = agentStr ? JSON.parse(agentStr) : null; } catch {}

  const handleLogout = () => {
    localStorage.removeItem("agent");
    localStorage.removeItem("user");
    navigate("/agent/login");
  };

  const navLinks = [
    { to: "/agent/dashboard", label: "My Assignments", icon: <LayoutDashboard size={18} /> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0b2a4a] to-[#081f36] text-white flex flex-col shadow-xl
        transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:flex
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold">
            <span className="text-white">1</span>
            <span className="text-red-500">0</span>
            <span className="text-green-500">0</span>
            <span className="text-white ml-2">Transcripts</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Agent Portal</p>
        </div>

        {/* Agent Info */}
        {agent && (
          <div className="mx-4 mt-4 mb-2 bg-white/5 rounded-2xl p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                {(agent.name || "A").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{agent.name}</p>
                <p className="text-xs text-slate-400">{agent.employee_id}</p>
                <p className="text-xs text-slate-400 truncate">{agent.location || "—"}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((link) => {
            const active = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.icon}
                <span className="text-sm font-medium">{link.label}</span>
                {active && <span className="ml-auto w-1.5 h-5 bg-white rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all group border border-red-500/20 hover:border-red-500"
          >
            <span className="text-sm font-semibold">Logout</span>
            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setMenuOpen((p) => !p)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 ml-2 md:ml-0">
            <UserCircle size={20} className="text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">{agent?.name || "Agent"}</span>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
            {agent?.employee_id || "—"}
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
