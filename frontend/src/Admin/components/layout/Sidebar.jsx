import React from "react";
import logo from "../../../assets/100.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Truck,
  Settings,
  LogOut,
  MailWarning,
  Building2,
  GraduationCap,
  X,
  UserCog,
  Activity,
} from "lucide-react";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🔹 MAIN MENU
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Student Requests", path: "/admin/student-requests", icon: <Users size={20} /> },
    { name: "College Verification", path: "/admin/college-verification", icon: <ShieldCheck size={20} /> },
    { name: "Delivery", path: "/admin/delivery", icon: <Truck size={20} /> },
    { name: "College Requests", path: "/admin/college-requests", icon: <Building2 size={20} /> },
    { name: "Agent Management", path: "/admin/agents", icon: <UserCog size={20} /> },
    { name: "Agent Tracking", path: "/admin/agent-tracking", icon: <Activity size={20} /> },
  ];
  // 🔸 PARTNER MENU
  const partnerItems = [
    // { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-72 h-screen flex-col text-white bg-gradient-to-b from-[#0b2a4a] to-[#081f36] shadow-xl border-r border-white/5">

        {/* 🔵 LOGO */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">

            <div>
              <h2 className="text-xl font-bold">
                <span className="text-white">1</span>
                <span className="text-red-500">0</span>
                <span className="text-green-500">0</span>
                <span className="text-white ml-2">Transcripts</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Admin Management Hub
              </p>
            </div>

          </div>
        </div>

        {/* 📌 MENU */}
        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto custom-scrollbar">

          {/* 🔹 MAIN SECTION */}
          <div>
            <p className="text-xs text-slate-400 px-3 mb-2 uppercase tracking-wider font-semibold">
              Main
            </p>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-5 bg-white rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 🔸 PARTNER SECTION */}
          <div>
            <p className="text-xs text-slate-400 px-3 mb-2 uppercase tracking-wider font-semibold">
              System
            </p>
            <div className="space-y-1">
              {partnerItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-5 bg-white rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* 🔻 FOOTER */}
        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div> */}
              {/* <span className="text-xs text-slate-400 font-medium">System Online</span> */}
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all duration-300 group border border-red-500/20 hover:border-red-500"
            >
              <span className="text-sm font-semibold">Logout</span>
              <LogOut
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-72 h-full flex flex-col text-white bg-gradient-to-b from-[#0b2a4a] to-[#081f36] shadow-xl animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🔵 LOGO */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="font-bold text-lg">TS</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold">100 TS ADMIN</h2>
                  <p className="text-xs text-blue-400 uppercase tracking-wider">
                    Management Hub
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* 📌 MENU */}
            <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto custom-scrollbar">

              {/* 🔹 MAIN SECTION */}
              <div>
                <p className="text-xs text-slate-400 px-3 mb-2 uppercase tracking-wider font-semibold">
                  Main
                </p>
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.name}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-5 bg-white rounded-full"></span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* 🔸 PARTNER SECTION */}
              <div>
                <p className="text-xs text-slate-400 px-3 mb-2 uppercase tracking-wider font-semibold">
                  System
                </p>
                <div className="space-y-1">
                  {partnerItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                            : "text-slate-300 hover:bg-white/10 hover:text-white"
                          }`}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.name}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-5 bg-white rounded-full"></span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* 🔻 FOOTER */}
            <div className="p-4 border-t border-white/5">
              <div className="bg-white/5 rounded-2xl p-4">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all duration-300 group border border-red-500/20 hover:border-red-500"
                >
                  <span className="text-sm font-semibold">Logout</span>
                  <LogOut
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;