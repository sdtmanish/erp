'use client';

import {useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiChevronRight, FiHome, FiSettings, FiUsers, FiBarChart2, FiFolder, FiX } from 'react-icons/fi';
import { Scrollbar } from 'react-scrollbars-custom';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [active, setActive] = useState('');
  const [expanded, setExpanded] = useState('');
  const [menuGroups, setMenuGroups] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const router = useRouter();

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  const hoverSlideStyle = (start, end) => ({
    backgroundImage: `linear-gradient(to right, ${start} 0%, ${end} 100%)`,
    backgroundSize: '0% 100%',
    backgroundRepeat: 'no-repeat',
    transition: 'background-size 0.3s ease-in-out',
  });

  const hoverSlideActiveStyle = (start, end) => ({
    backgroundImage: `linear-gradient(to right, ${start} 0%, ${end} 100%)`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
  });

  const colorPalettes = [
    { start: '#eff6ff', end: '#dbeafe', active: 'text-blue-600 dark:text-blue-400' },
    { start: '#ecfdf5', end: '#d1fae5', active: 'text-green-600 dark:text-green-400' },
    { start: '#f5f3ff', end: '#ede9fe', active: 'text-purple-600 dark:text-purple-400' },
    { start: '#fdf2f8', end: '#fce7f3', active: 'text-pink-600 dark:text-pink-400' },
    { start: '#fefce8', end: '#fef9c3', active: 'text-yellow-600 dark:text-yellow-400' },
    { start: '#fef2f2', end: '#fee2e2', active: 'text-red-600 dark:text-red-400' },
    { start: '#ecfeff', end: '#cffafe', active: 'text-cyan-600 dark:text-cyan-400' },
  ];

  const groupIcons = {
    Dashboard: <FiHome className="text-lg" />,
    Settings: <FiSettings className="text-lg" />,
    Users: <FiUsers className="text-lg" />,
    Reports: <FiBarChart2 className="text-lg" />,
    Default: <FiFolder className="text-lg" />,
  };

  const itemIcons = {
    DashboardHome: <FiHome className="text-lg" />,
    UserManagement: <FiUsers className="text-lg" />,
    Reports: <FiBarChart2 className="text-lg" />,
    Default: <FiFolder className="text-lg" />,
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('menuData');
    if (stored) {
      const parsed = JSON.parse(stored);
      const filtered = parsed.filter((item) => item.MainGroup !== 'Tiles' && item.MainGroup !== 'Custom');
      const grouped = {};
      for (const item of filtered) {
        if (!grouped[item.MainGroup]) grouped[item.MainGroup] = [];
        grouped[item.MainGroup].push(item);
      }
      setMenuGroups(grouped);
    }
  }, []);
  
  const showContent = isOpen || isHovering;

  return (
    <>
      <aside
        className={`
          ${isMobile ? 'fixed' : 'relative'} top-0 left-0 h-screen bg-primary shadow-md border-r border-blue-100 flex flex-col transition-all duration-300 z-40 rounded-none 
          ${isMobile ? (isOpen ? 'w-full' : 'w-0') : isOpen ? 'w-64' : 'w-16 hover:w-64'}
        `}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {(!isMobile || isOpen) && (
          <div className="p-4 pt-8 cursor-pointer border-b border-gray-200 bg-primary sticky top-0 z-50 flex items-center justify-between">
            <div className="flex gap-2" onClick={handleDashboardClick}>
              <img src="/assets/logo.png" className="w-6 h-6" alt="Logo" />
              {showContent && (
                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">Spike Admin</h1>
              )}
            </div>

            {isMobile && isOpen && (
              <button onClick={() => setIsOpen(false)} className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition">
                <FiX />
              </button>
            )}
          </div>
        )}

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
            style: { background: 'transparent', width: '6px' },
          }}
        >
          <div>
            <nav className="flex flex-col gap-3 mt-2">
              {Object.entries(menuGroups).map(([groupName, items], groupIndex) => {
                const isGroupOpen = expanded === groupName;
                const groupPalette = colorPalettes[groupIndex % colorPalettes.length];

                return (
                  <div key={groupName}>
                    <button
                      // Corrected onClick handler to toggle expanded state
                      onClick={() => setExpanded(isGroupOpen ? '' : groupName)}
                      className={`relative w-full flex items-center px-4 py-3 text-base font-normal rounded-e-3xl transition 
                        ${isGroupOpen ? groupPalette.active : 'text-gray-900 dark:text-gray-200'}`}
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
                        {showContent && <span>{groupName}</span>}
                      </span>
                      {showContent && (
                        <FiChevronRight
                          className={`transition-transform duration-200 ${isGroupOpen ? 'rotate-90' : ''}`}
                        />
                      )}
                    </button>

                    <div
                      // Corrected visibility condition for the submenu
                      className={`transition-all duration-300 overflow-hidden ${
                        isGroupOpen ? 'max-h-[9999px] mt-2' : 'max-h-0'
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
                              {showContent && (
                                <span className="relative z-10 text-base truncate">
                                  {item.WebModuleName || 'Unnamed'}
                                </span>
                              )}
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

        {showContent && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-primary dark:bg-gray-900">
            <div
              className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'} bg-blue-50 dark:bg-gray-800 px-4 py-2 rounded-2xl cursor-pointer hover:shadow-sm transition`}
            >
              <div className="flex items-center gap-2">
                <img src="/assets/logo.png" className="w-8 h-8 rounded-full object-cover" alt="User" />
                {showContent && (
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Mike</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                  </div>
                )}
              </div>
              {showContent && <FiChevronRight className="text-gray-500 dark:text-gray-400" />}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}