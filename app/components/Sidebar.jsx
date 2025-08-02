'use client';

import { useEffect, useState } from 'react';
import { FiChevronRight, FiX, FiMenu } from 'react-icons/fi';
import { Scrollbar } from 'react-scrollbars-custom';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [active, setActive] = useState('');
  const [expanded, setExpanded] = useState('');
  const [menuGroups, setMenuGroups] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Hover & active color palette
  const colorPalettes = [
    {
      hover: 'bg-gradient-to-r from-transparent to-transparent hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-900/30',
      active: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      hover: 'bg-gradient-to-r from-transparent to-transparent hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/20 dark:hover:to-green-900/30',
      active: 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 text-green-600 dark:text-green-400'
    },
    {
      hover: 'bg-gradient-to-r from-transparent to-transparent hover:from-purple-50 hover:to-purple-100 dark:hover:from-purple-900/20 dark:hover:to-purple-900/30',
      active: 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 text-purple-600 dark:text-purple-400'
    },
    {
      hover: 'bg-gradient-to-r from-transparent to-transparent hover:from-pink-50 hover:to-pink-100 dark:hover:from-pink-900/20 dark:hover:to-pink-900/30',
      active: 'bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-900/30 text-pink-600 dark:text-pink-400'
    },
    {
      hover: 'bg-gradient-to-r from-transparent to-transparent hover:from-yellow-50 hover:to-yellow-100 dark:hover:from-yellow-900/20 dark:hover:to-yellow-900/30',
      active: 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30 text-yellow-600 dark:text-yellow-400'
    },
    {
      hover: 'bg-gradient-to-r from-transparent to-transparent hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/20 dark:hover:to-red-900/30',
      active: 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/30 text-red-600 dark:text-red-400'
    },
    {
      hover: 'bg-gradient-to-r from-transparent to-transparent hover:from-cyan-50 hover:to-cyan-100 dark:hover:from-cyan-900/20 dark:hover:to-cyan-900/30',
      active: 'bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-900/30 text-cyan-600 dark:text-cyan-400'
    }
  ];

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
        (item) => item.MainGroup !== 'Tiles' && item.MainGroup !== 'Custom'
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
          className="fixed top-7 left-6 z-50 p-2 bg-white border rounded-full shadow-md hover:bg-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <FiMenu className="text-xl text-gray-700 dark:text-gray-300" />
        </button>
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-md border-r border-blue-100 dark:border-gray-800 flex flex-col transition-transform duration-300 z-40 rounded-none md:rounded-e-3xl 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'w-full' : 'w-64'}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 pt-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" className="w-6 h-6" alt="Logo" />
              <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Spike Admin</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Close Sidebar"
            >
              <FiX className="text-xl text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Menu */}
        <Scrollbar
          style={{ flex: 1, width: '100%' }}
          thumbYProps={{
            style: {
              background: 'rgba(100, 116, 139, 0.6)',
              borderRadius: '9999px',
              width: '6px',
              minHeight: '20px',
            },
          }}
          trackYProps={{
            style: {
              background: 'transparent',
              width: '6px',
            },
          }}
        >
          <div className="p-4">
            <nav className="flex flex-col gap-3">
              {Object.entries(menuGroups).map(([groupName, items], groupIndex) => {
                const isGroupOpen = expanded === groupName;
                const groupPalette = colorPalettes[groupIndex % colorPalettes.length];

                return (
                  <div key={groupName}>
                    {/* Group Button */}
                    <button
                      onClick={() => setExpanded(isGroupOpen ? '' : groupName)}
                      className={`relative w-full flex items-center justify-between px-4 py-4 text-sm font-semibold rounded-e-3xl transition 
                        ${isGroupOpen 
                          ? groupPalette.active 
                          : `text-gray-700 dark:text-gray-200 ${groupPalette.hover}`
                        }`}
                      aria-expanded={isGroupOpen}
                    >
                      <span className="flex-1 text-left">{groupName}</span>
                      <span
                        className={`transform transition-transform duration-200 ${isGroupOpen ? 'rotate-90' : ''}`}
                      >
                        <FiChevronRight className="text-gray-500 dark:text-gray-400" />
                      </span>
                    </button>

                    {/* Dropdown Items */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        isGroupOpen ? 'max-h-[500px] mt-1' : 'max-h-0'
                      }`}
                    >
                      <div className="pl-0 pr-0 flex flex-col gap-2">
                        {items.map((item, i) => {
                          const isActive = active === item.WebModuleName;
                          const palette = colorPalettes[i % colorPalettes.length];

                          return (
                            <div
                              key={i}
                              onClick={() => {
                                setActive(item.WebModuleName);
                                if (isMobile) setIsOpen(false);
                              }}
                              className={`relative flex items-center gap-2 px-4 py-4 cursor-pointer rounded-e-3xl transition-colors duration-200 
                                ${isActive
                                  ? palette.active
                                  : `text-gray-700 dark:text-gray-200 ${palette.hover}`
                                }`}
                            >
                              <span className="relative z-10 text-sm truncate">
                                {item.WebModuleName || 'Unnamed'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>
        </Scrollbar>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between bg-blue-50 dark:bg-gray-800 px-4 py-2 rounded-2xl cursor-pointer hover:shadow-sm transition">
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo.png"
                className="w-8 h-8 rounded-full object-cover"
                alt="User"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Mike</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
            </div>
            <FiChevronRight className="text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </aside>
    </>
  );
}
