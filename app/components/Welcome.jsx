'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PiCurrencyDollar, PiShoppingCart, PiReceipt } from 'react-icons/pi';

export default function Welcome() {
  const [name, setName] = useState('Mike Nielsen');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.UserName) {
          setName(user.UserName);
        } else {
          setError('User name not found.');
        }
      } else {
        setError('No user data found.');
      }
    } catch (err) {
      setError('Error reading user data.');
    }
  }, []);

  const handleClick = () => {
    try {
      setMessage('Redirecting to dashboard...');
      setError('');
    } catch (err) {
      setError('Something went wrong.');
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-[96%] md:w-[90%] max-w-[1600px] mx-auto gap-4 justify-between items-start bg-[#f3f8ff] p-2">
      
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between w-full lg:max-w-xl mb-2 mt-1">
        <div className="space-y-2 flex-1 text-center sm:text-left">
          <h2 className="text-lg font-medium text-gray-900">Welcome {name}</h2>
          <p className="text-sm text-gray-500">Check All The Statistics</p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-full"
            onClick={handleClick}
          >
            Visit Now
          </button>
          {message && <p className="text-green-600 text-sm mt-1">{message}</p>}
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        <div className="w-[120px] sm:w-[150px] md:w-[180px] mt-4 sm:mt-0">
          <Image
            src="/assets/welcome.png"
            alt="Welcome illustration"
            width={180}
            height={180}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-auto">
        <StatCard
          icon={<PiShoppingCart className="text-white text-2xl" />}
          value="2358"
          label="Sales"
          change="+23%"
          color="from-orange-400 to-yellow-300"
        />
        <StatCard
          icon={<PiReceipt className="text-white text-2xl" />}
          value="356"
          label="Refunds"
          change="+8%"
          color="from-red-400 to-pink-300"
        />
        <StatCard
          icon={<PiCurrencyDollar className="text-white text-2xl" />}
          value="$235.8K"
          label="Earnings"
          change="-3%"
          color="from-cyan-400 to-blue-400"
        />
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon, value, label, change, color }) {
  return (
    <div
      className={`min-w-[150px] bg-white rounded-xl shadow-md p-4 text-black flex flex-col justify-between`}
    >
      <div className="flex justify-between items-start">
        {icon}
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color}`}></div>
      </div>
      <div>
        <h3 className="text-xl font-semibold">
          {value} <span className="text-xs">{change}</span>
        </h3>
        <p className="text-sm opacity-80">{label}</p>
      </div>
    </div>
  );
}
