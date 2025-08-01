'use client';

import { useEffect, useState } from 'react';
import { FiChevronRight, FiX, FiMenu } from 'react-icons/fi';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [active, setActive] = useState('');
  const [expanded, setExpanded] = useState('');
  const [menuGroups, setMenuGroups] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load menu items
  useEffect(() => {
    const stored = localStorage.getItem('menuData');
    if (stored) {
      const parsed = JSON.parse(stored);
      const filtered = parsed.filter(
        item => item.MainGroup !== 'Tiles' && item.MainGroup !== 'Custom'
      );
      const grouped = {};
      for (const item of filtered) {
        if (!grouped[item.MainGroup]) grouped[item.MainGroup] = [];
        grouped[item.MainGroup].push(item);
      }
      setMenuGroups(grouped);
    }
  }, []);

  return (
    <>
      {/* Toggle Button (Mobile Only) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-7 left-6 z-50 p-2 bg-white border rounded-full shadow-md hover:bg-gray-100"
        >
          <FiMenu className="text-xl text-gray-700" />
        </button>
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-md border-r border-blue-100 flex flex-col justify-between transition-transform duration-300 z-40 overflow-y-auto rounded-none md:rounded-e-3xl 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'w-full' : 'w-64'}
        `}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" className="w-6 h-6" alt="Logo" />
              <h1 className="text-lg font-bold text-gray-800">Spike Admin</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
              title="Close Sidebar"
            >
              <FiX className="text-xl text-gray-600" />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-1">
            {Object.entries(menuGroups).map(([groupName, items]) => {
              const isGroupOpen = expanded === groupName;

              return (
                <div key={groupName}>
                  <button
                    onClick={() => setExpanded(isGroupOpen ? '' : groupName)}
                    className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-semibold text-gray-700 transition focus:outline-none"
                    aria-expanded={isGroupOpen}
                  >
                    {groupName}
                    <span
                      className={`transform transition-transform duration-200 ${
                        isGroupOpen ? 'rotate-90' : ''
                      }`}
                    >
                      <FiChevronRight className="text-gray-500" />
                    </span>
                  </button>

                  {/* Dropdown Items */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isGroupOpen ? 'max-h-[500px] mt-1' : 'max-h-0'
                    }`}
                  >
                    <div className="pl-5 pr-2 flex flex-col gap-1">
                      {items.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setActive(item.WebModuleName);
                            if (isMobile) setIsOpen(false); // Auto close on mobile
                          }}
                          className={`group relative flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                            active === item.WebModuleName
                              ? 'bg-blue-100 text-blue-700 font-medium shadow-inner'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div
                            className={`absolute left-0 top-0 h-full w-1 rounded-r-md transition-all duration-200 ${
                              active === item.WebModuleName
                                ? 'bg-blue-600'
                                : 'bg-transparent'
                            }`}
                          />
                          <span className="text-sm truncate">
                            {item.WebModuleName || 'Unnamed'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4">
          <div className="flex items-center justify-between bg-blue-50 px-4 py-2 rounded-2xl cursor-pointer hover:shadow-sm transition">
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo.png"
                className="w-8 h-8 rounded-full object-cover"
                alt="User"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">Mike</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <FiChevronRight className="text-gray-500" />
          </div>
        </div>
      </aside>
    </>
  );
}
