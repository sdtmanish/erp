'use client';

import { useEffect, useState } from 'react';

export default function Tiles() {
  const [tiles, setTiles] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('menuData');
    if (stored) {
      const parsed = JSON.parse(stored);
      const tileItems = parsed.filter(item => item.MainGroup === 'Tiles');
      setTiles(tileItems);
    }
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-2 p-4 bg-gradient-to-br from-[#f8f9fc] to-[#e0e7ff]">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className="h-14 w-full flex items-center justify-center text-center text-[13px] font-medium text-gray-700 bg-white rounded-md shadow-sm hover:shadow-md transition hover:-translate-y-0.5 cursor-pointer"
        >
          {tile.WebModuleName || 'Unnamed'}
        </div>
      ))}
    </div>
  );
}
