'use client';

import { useState, useEffect } from 'react';

export default function ChangePassword() {
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Get userId and userType from localStorage when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('UserId');
    const storedUserType = localStorage.getItem('UserType');

    if (storedUserId && storedUserType) {
      setUserId(storedUserId);
      setUserType(storedUserType);
    } else {
      setMessage('User not logged in or session expired.');
    }
  }, []);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setMessage('Please enter both old and new password.');
      return;
    }

    try {
      const response = await fetch('http://apidol.myportal.co.in/api/CP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': 'Sdt!@#321',
        },
        body: JSON.stringify({
          UserId: userId,
          UserType: userType,
          OldPass: oldPassword,
          NewPass: newPassword,
        }),
      });

      const result = await response.json();
      console.log('Password change response:', result);

      if (result?.Message) {
        setMessage(result.Message);
      } else {
        setMessage('Password changed successfully.');
      }
    } catch (error) {
      console.error('Error in Changing Password:', error);
      setMessage('An error occurred while changing the password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Change Password
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && (
            <p className="text-sm text-center text-red-600">{message}</p>
          )}

          <button
            onClick={handleChangePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
