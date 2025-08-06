'use client';

import { useEffect, useState } from 'react';
import {
  FiChevronRight,
  FiHome,
  FiSettings,
  FiUsers,
  FiBarChart2,
  FiFolder,
  Fix,
  FiX
} from 'react-icons/fi';
import { Scrollbar } from 'react-scrollbars-custom';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [active, setActive] = useState('');
  const [expanded, setExpanded] = useState('');
  const [menuGroups, setMenuGroups] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Hover animation
  const hoverSlideStyle = (start, end) => ({
    backgroundImage: `linear-gradient(to right, ${start} 0%, ${end} 100%)`,
    backgroundSize: '0% 100%',
    backgroundRepeat: 'no-repeat',
    transition: 'background-size 0.3s ease-in-out'
  });

  const hoverSlideActiveStyle = (start, end) => ({
    backgroundImage: `linear-gradient(to right, ${start} 0%, ${end} 100%)`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  });

  // Color palettes
  const colorPalettes = [
    { start: '#eff6ff', end: '#dbeafe', active: 'text-blue-600 dark:text-blue-400' },
    { start: '#ecfdf5', end: '#d1fae5', active: 'text-green-600 dark:text-green-400' },
    { start: '#f5f3ff', end: '#ede9fe', active: 'text-purple-600 dark:text-purple-400' },
    { start: '#fdf2f8', end: '#fce7f3', active: 'text-pink-600 dark:text-pink-400' },
    { start: '#fefce8', end: '#fef9c3', active: 'text-yellow-600 dark:text-yellow-400' },
    { start: '#fef2f2', end: '#fee2e2', active: 'text-red-600 dark:text-red-400' },
    { start: '#ecfeff', end: '#cffafe', active: 'text-cyan-600 dark:text-cyan-400' }
  ];

  // Group icons
  const groupIcons = {
    Dashboard: <FiHome className="text-lg" />,
    Settings: <FiSettings className="text-lg" />,
    Users: <FiUsers className="text-lg" />,
    Reports: <FiBarChart2 className="text-lg" />,
    Default: <FiFolder className="text-lg" />
  };

  // Item icons
  const itemIcons = {
    DashboardHome: <FiHome className="text-lg" />,
    UserManagement: <FiUsers className="text-lg" />,
    Reports: <FiBarChart2 className="text-lg" />,
    Default: <FiFolder className="text-lg" />
  };

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
      <aside
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-md border-r border-blue-100 dark:border-gray-800 flex flex-col transition-all duration-300 z-40 rounded-none 
          ${isMobile ? (isOpen ? 'w-full' : 'w-0') : isOpen ? 'w-64' : 'w-16'}`}
      >
       {/* Sidebar Header */}
{(!isMobile || isOpen) && (
  <div className="p-4 pt-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50 flex items-center justify-between">
    <div className="flex gap-2">
      <img src="/assets/logo.png" className="w-6 h-6" alt="Logo" />
      {isOpen && (
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Spike Admin
        </h1>
      )}
    </div>

    {isMobile && isOpen && (
      <button
        onClick={() => setIsOpen(false)}
        className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
      >
        <FiX />
      </button>
    )}
  </div>
)}

       

        {/* Scrollable Menu */}
        <Scrollbar
          style={{ flex: 1, width: '100%' }}
          thumbYProps={{
            style: {
              background: 'rgba(100, 116, 139, 0.6)',
              borderRadius: '9999px',
              width: '6px',
              minHeight: '20px'
            }
          }}
          trackYProps={{
            style: { background: 'transparent', width: '6px' }
          }}
        >
          <div>
            <nav className="flex flex-col gap-3 mt-2">
              {Object.entries(menuGroups).map(([groupName, items], groupIndex) => {
                const isGroupOpen = expanded === groupName && isOpen;
                const groupPalette = colorPalettes[groupIndex % colorPalettes.length];

                return (
                  <div key={groupName}>
                    <button
                      onClick={() => setExpanded(isGroupOpen ? '' : groupName)}
                      className={`relative w-full flex items-center px-4 py-3 text-sm font-semibold rounded-e-3xl transition 
                        ${isGroupOpen ? groupPalette.active : 'text-gray-700 dark:text-gray-200'}`}
                      style={
                        isGroupOpen
                          ? hoverSlideActiveStyle(groupPalette.start, groupPalette.end)
                          : hoverSlideStyle(groupPalette.start, groupPalette.end)
                      }
                      onMouseEnter={(e) => !isGroupOpen && (e.currentTarget.style.backgroundSize = '100% 100%')}
                      onMouseLeave={(e) => !isGroupOpen && (e.currentTarget.style.backgroundSize = '0% 100%')}
                      aria-expanded={isGroupOpen}
                    >
                      <span className="flex items-center gap-2 flex-1">
                        {groupIcons[groupName] || groupIcons.Default}
                        {isOpen && <span>{groupName}</span>}
                      </span>
                      {isOpen && (
                        <FiChevronRight
                          className={`transition-transform duration-200 ${isGroupOpen ? 'rotate-90' : ''}`}
                        />
                      )}
                    </button>

                    {/* Dropdown Items */}
                    {isOpen && (
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          isGroupOpen ? 'max-h-[9999px] mt-1' : 'max-h-0'
                        }`}
                      >
                        <div className="pl-4 pr-0 flex flex-col gap-2">
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
                                className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-e-3xl transition-colors duration-200 
                                  ${isActive ? palette.active : 'text-gray-700 dark:text-gray-200'}`}
                                style={
                                  isActive
                                    ? hoverSlideActiveStyle(palette.start, palette.end)
                                    : hoverSlideStyle(palette.start, palette.end)
                                }
                                onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundSize = '100% 100%')}
                                onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundSize = '0% 100%')}
                              >
                                {itemIcons[item.WebModuleName] || itemIcons.Default}
                                {isOpen && (
                                  <span className="relative z-10 text-sm truncate">
                                    {item.WebModuleName || 'Unnamed'}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </Scrollbar>

        {/* Footer */}
      {isOpen && ( <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div
            className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} bg-blue-50 dark:bg-gray-800 px-4 py-2 rounded-2xl cursor-pointer hover:shadow-sm transition`}
          >
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo.png"
                className="w-8 h-8 rounded-full object-cover"
                alt="User"
              />
              {isOpen && (
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Mike</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                </div>
              )}
            </div>
            {isOpen && <FiChevronRight className="text-gray-500 dark:text-gray-400" />}
          </div>
        
        </div>  )} 
      </aside>
    </>
  );
}
