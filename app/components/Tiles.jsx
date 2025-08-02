'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Tiles() {
  const [tiles, setTiles] = useState([]);

  // Color palette to rotate between for vibrant tiles
  const colors = [
    'from-blue-500 to-blue-400',
    'from-green-500 to-green-400',
    'from-purple-500 to-purple-400',
    'from-pink-500 to-pink-400',
    'from-yellow-500 to-yellow-400',
    'from-red-500 to-red-400',
    'from-cyan-500 to-cyan-400',
  ];

  useEffect(() => {
    const stored = localStorage.getItem('menuData');
    if (stored) {
      const parsed = JSON.parse(stored);
      const tileItems = parsed.filter(item => item.MainGroup === 'Tiles');
      setTiles(tileItems);
    }
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-4 p-6 bg-gradient-to-br from-[#f8f9fc] to-[#eef2ff]">
      {tiles.map((tile, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          className={`h-20 w-full flex items-center justify-center text-center text-sm font-medium text-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer bg-gradient-to-r ${
            colors[index % colors.length]
          }`}
        >
          <span className="px-2">{tile.WebModuleName || 'Unnamed'}</span>
        </motion.div>
      ))}

      {/* If no tiles are available */}
      {tiles.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-6">
          No tiles available.
        </div>
      )}
    </div>
  );
}
