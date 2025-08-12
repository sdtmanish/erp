'use client';

import { useState } from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { UserProvider } from '../context/userContext'; // ✅ Update the actual path

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <UserProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarOpen ? 'ml-0 md:ml-64' : 'md:ml-16'
          }`}
        >
          <Header isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          <main className="flex-1  overflow-auto  ">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
