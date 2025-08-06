'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePassword() {
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // NEW FIELD
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Get userId and userType from localStorage when component mounts
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userData');
      console.log('🔍 Stored userData:', storedUser);

      if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user?.UserCode && user?.UserType) {
          setUserId(user.UserCode);
          setUserType(user.UserType);
        } else {
          setMessage('User data is incomplete. Please log in again.');
        }
      } else {
        setMessage('User not logged in or session expired.');
      }
    } catch (err) {
      console.error('Error reading localStorage:', err);
      setMessage('Could not read user information. Please log in again.');
    }
  }, []);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage('Please fill all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }
    if (!userId || !userType) {
      setMessage('User information missing. Please log in again.');
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
      console.log('🔍 Password change response:', result);

      // Handle string or object API response
      const msg = typeof result === 'string' ? result : result?.Message;

      if (msg) {
        setMessage(msg.trim());

        if (msg.toLowerCase().includes('success')) {
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword(''); // clear confirm password too

          // OPTIONAL: redirect to home after 1.5s
          setTimeout(() => router.push('/'), 1500);
        }
      } else {
        setMessage('Password change failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Error changing password:', error);
      setMessage('An error occurred while changing the password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
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

          {/* Confirm New Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && (
            <p
              className={`text-sm text-center ${
                message.toLowerCase().includes('success')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {message}
            </p>
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
