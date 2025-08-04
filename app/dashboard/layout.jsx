'use client';

import { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'
        }`}
      >
        <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 p-4 overflow-auto md:ml-16">
          {children}
        </main>
      </div>
    </div>
  );
}
