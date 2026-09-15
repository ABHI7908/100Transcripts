import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#0b2a4a] text-white">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
              TS
            </div>
            <span className="font-bold">100 TS ADMIN</span>
          </div>
          <div className="w-8"></div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          <Outlet />  {/* THIS IS THE MAIN FIX */}

        </main>
      </div>

    </div>
  );
};

export default Layout;