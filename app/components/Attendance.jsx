'use client';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const totalCells = 42;
  const calendarCells = [];

  // Create empty cells for the previous month's days
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`prev-${i}`} className="p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"></div>);
  }

  // Create cells for the current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const isToday = dayDate.toDateString() === new Date().toDateString();
    
    calendarCells.push(
      <div 
        key={`day-${i}`} 
        className={`p-4 border border-gray-200 dark:border-gray-700 text-center cursor-pointer font-medium
          ${isToday ? 'bg-indigo-500 text-white dark:bg-indigo-500' : 'hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-200'}`}
      >
        {i}
      </div>
    );
  }

  // Fill the rest of the grid with empty cells for the next month
  const remainingCells = totalCells - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push(<div key={`next-${i}`} className="p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"></div>);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="w-[96%] md:w-[90%] max-w-[1600px] mx-auto mb-4 mt-4 bg-primary  rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300">
      {/* Calendar Navigation */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button onClick={handlePrevMonth} className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
          <FaChevronLeft size={18} />
        </button>
        <span className="text-xl font-bold text-gray-800 dark:text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={handleNextMonth} className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
          <FaChevronRight size={18} />
        </button>
      </div>

      {/* Days of the week */}
      <div className="grid grid-cols-7 text-center font-bold text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        {days.map(day => (
          <div key={day} className="p-3 border-r last:border-r-0 border-gray-200 dark:border-gray-700">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarCells}
      </div>
    </div>
  );
}