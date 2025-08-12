// components/FloatingInput.jsx
// This component encapsulates the floating label input field.
'use client'
import React, { useState } from 'react';

// Define the FloatingInput component
const FloatingInput = ({ label, id, type = 'text', ...props }) => {
  const [value, setValue] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative mb-8 w-full">
      {/* The input field */}
      <input
        type={type}
        id={id}
        // Using `value` and `onChange` to make it a controlled component
        value={value}
        onChange={handleChange}
        // `placeholder=" "` is crucial for the :not(:placeholder-shown) CSS selector to work
        placeholder=" "
        // `peer` class marks this input as the element whose state will affect its siblings
        className="input-field peer w-full py-4 px-3 border border-gray-300 rounded-lg text-base outline-none bg-transparent transition-colors duration-200 ease-in-out
                   focus:border-blue-500 focus:ring focus:ring-blue-300"
        {...props} // Pass any additional props like autocomplete="off"
      />
      {/* The label */}
      <label
        htmlFor={id}
        // `label-float` and `label-static` are custom classes for the floating effect
        // `absolute`, `top-4`, `left-3`, `text-gray-500` for initial positioning and styling
        // `transition-all`, `duration-200`, `ease-in-out` for smooth animation
        className="absolute top-4 left-3 text-gray-500 transition-all duration-200 ease-in-out label-float label-static"
      >
        {label}
      </label>
    </div>
  );
};

// You can create a main App component to demonstrate the FloatingInput
// In a typical Next.js project, this would likely be in `pages/index.js` or a similar page file.
const App = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Input</h2>
        {/* Use the FloatingInput component */}
        <FloatingInput
          id="nameInput"
          label="Enter your name"
          autocomplete="off"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          Submit
        </button>
      </div>
      {/* Tailwind CSS CDN (for Canvas preview, in a real Next.js app you'd configure Tailwind) */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Custom styles for the floating label effect */}
      <style jsx global>{`
        body {
            font-family: "Inter", sans-serif; /* Ensuring Inter font is used */
        }
        .peer:focus + .label-float,
        .peer:not(:placeholder-shown) + .label-float {
            top: -0.75rem; /* Moves the label above the input field */
            font-size: 0.75rem; /* Shrinks the font size */
            color: #3b82f6; /* Changes color to blue-500 */
            transform: translateX(-0.25rem); /* Adjusts horizontal position slightly */
            background-color: white; /* Ensures the background covers the input border */
            padding: 0 0.25rem; /* Adds padding to the background */
        }
        .label-static {
            pointer-events: none; /* Prevents the label from blocking clicks on the input */
        }
      `}</style>
    </div>
  );
};

export default App; // Export App as default for React rendering
