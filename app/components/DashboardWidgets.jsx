'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Pie chart data
const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Home', value: 300 },
  { name: 'Books', value: 200 },
];

const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

// Bar chart data (Earnings)
const barData = [
  { name: 'M', earning: 5000 },
  { name: 'T', earning: 6200 },
  { name: 'W', earning: 5800 },
  { name: 'T', earning: 6400 },
  { name: 'F', earning: 7000 },
  { name: 'S', earning: 6600 },
  { name: 'S', earning: 6000 },
];

// Line chart data (Total Orders)
const ordersData = [
  { name: 'Mon', orders1: 0, orders2: 0 },
  { name: 'Tue', orders1: 18000, orders2: 12000 },
  { name: 'Wed', orders1: 16000, orders2: 17000 },
  { name: 'Thu', orders1: 17000, orders2: 11000 },
  { name: 'Fri', orders1: 15000, orders2: 25000 },
  { name: 'Sat', orders1: 24000, orders2: 19000 },
  { name: 'Sun', orders1: 31000, orders2: 24000 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 w-[96%] md:w-[90%] max-w-[1600px] mx-auto p-2 shadow-md rounded-lg text-gray-800 text-sm border border-gray-100">
        <p>{payload[0].name}</p>
        {payload.map((item, i) => (
          <p key={i} style={{ color: item.stroke || '#111' }}>
            {item.dataKey}: {item.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardWidgets() {
  const [earnings] = useState(12389);
  const [percentageChange] = useState(-3.8);
  const [filter] = useState('This Week');

  return (
    <div className="grid grid-cols-1  w-[96%] md:w-[90%] max-w-[1600px] mx-auto lg:grid-cols-3 gap-6 p-2 bg-gradient-to-br from-[#f8f9fc] to-[#eef2ff] h-full">
      {/* Earnings Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-5 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-gray-100 flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Earning</h2>
            <p className="text-sm text-gray-500">Last 7 Days</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">{earnings.toLocaleString()}</p>
            <p
              className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                percentageChange < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}
            >
              {percentageChange}%
            </p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="earning" radius={[6, 6, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#3b82f6" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Wrappixel
            </div>
            <span>52%</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
              Wrappixel
            </div>
            <span>48%</span>
          </div>
        </div>
      </motion.div>

      {/* Donut Chart Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="p-5 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-gray-100 flex flex-col items-center"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Sales by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Total Orders Chart Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="p-5 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg border border-gray-100 flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
            <p className="text-sm text-gray-500">Weekly Order Updates</p>
          </div>
          <button className="flex items-center text-sm border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100 transition">
            {filter}
            <ChevronDown size={16} className="ml-1 text-gray-600" />
          </button>
        </div>
        <div className="w-full h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="orders1"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="orders2"
                stroke="#06b6d4"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
