'use client';
import {useState} from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


export default function DashboardLayout({ children }) {
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className=" fixed top-0 left-0 h-screen z-50 bg-white border-r">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header/>
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
