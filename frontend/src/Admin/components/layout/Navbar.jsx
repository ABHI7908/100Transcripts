import React from "react";
import { Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
      case "/dashboard":
        return "Dashboard Overview";
      case "/student-requests":
        return "Student Requests";
      case "/college-verification":
        return "College Verification";
      case "/delivery":
        return "Delivery Management";
      case "/settings":
        return "Admin Settings";
      default:
        return "HUB Admin";
    }
  };

  return (
    // THE NAVY BLUR STYLES: 
    // bg-[#0b2a4a]/80 = Navy with 80% opacity
    // backdrop-blur-md = The glass effect
    // sticky top-0 z-50 = Keeps it at the top while scrolling
    <nav className="sticky top-0 z-50 h-[80px] bg-[#0b2a4a]/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 shadow-2xl">

      {/* LEFT - Dynamic Title */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          {getTitle()}
        </h1>
        <p className="text-[10px] text-blue-400 uppercase tracking-widest font-black opacity-80">
          EduTech v2.0
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* Search Bar - Modern Dark Version */}
        <div className="hidden lg:flex items-center bg-white/10 border border-white/10 px-4 py-2 rounded-xl focus-within:bg-white/20 transition-all">
          <Search size={18} className="text-blue-300" />
          <input
            type="text"
            placeholder="Search records..."
            className="bg-transparent outline-none ml-3 text-sm text-white placeholder:text-slate-400 w-64"
          />
        </div>

        {/* Notification Icon */}
        <div className="relative p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors border border-white/5">
          <Bell className="text-blue-200" size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0b2a4a]"></span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 pl-4 border-l border-white/10 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Admin User</p>
            <p className="text-[11px] text-slate-400 font-medium">System Manager</p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg shadow-blue-500/20 transform group-hover:rotate-3 transition-transform">
            A
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;