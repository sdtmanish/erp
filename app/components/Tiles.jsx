'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiRefreshCw, FiShoppingCart } from 'react-icons/fi';

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

  const icons = [<FiShoppingCart />, <FiRefreshCw />, <FiDollarSign />];

  // Define color themes per tile
  const tileThemes = [
    {
      bg: 'bg-[#0984e3]', // blue
      blob: 'from-orange-300 to-pink-400',
    },
    {
      bg: 'bg-[#00b894]', // green
      blob: 'from-green-300 to-emerald-500',
    },
    {
      bg: 'bg-[#fd79a8]', // pink
      blob: 'from-pink-300 to-red-400',
    },
    {
      bg: 'bg-[#6c5ce7]', // purple
      blob: 'from-indigo-300 to-purple-400',
    },
    {
      bg: 'bg-[#e17055]', // orange
      blob: 'from-yellow-300 to-orange-400',
    },
    {
      bg: 'bg-[#00cec9]', // teal
      blob: 'from-cyan-300 to-teal-400',
    },
  ];

  return (
    <div className="grid grid-cols-3  w-[96%] md:w-[90%] max-w-[1600px] mx-auto sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-6 p-2 ">
      {tiles.map((tile, index) => {
        const theme = tileThemes[index % tileThemes.length];
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className={`relative ${theme.bg} rounded-xl text-white  p-2 shadow-lg overflow-hidden sm:p-5`}
          >
            {/* Corner blob with matching gradient */}
            <div
              className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-gradient-to-br ${theme.blob} -z-0`}
            ></div>

            {/* Icon */}
            <div className="text-xl relative z-10 mb-4 md:text-3xl">
              {icons[index % icons.length]}
            </div>

            {/* Tile name */}
            <p className="text-sm font-medium relative z-10 sm:text-lg">
              {tile.WebModuleName}
            </p>
          </motion.div>
        );
      })}

      {tiles.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-6">
          No tiles available.
        </div>
      )}
    </div>
  );
}
