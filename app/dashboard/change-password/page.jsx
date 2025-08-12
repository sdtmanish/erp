'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ChangePassword() {
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.UserCode && user?.UserType) {
          setUserId(user.UserCode);
          setUserType(user.UserType);
        } else {
          setMessage('User data is incomplete. Please log in again.');
          setMessageType('error');
        }
      } else {
        setMessage('User not logged in or session expired.');
        setMessageType('error');
      }
    } catch (err) {
      setMessage('Could not read user information. Please log in again.');
      setMessageType('error');
    }
  }, []);

  const handleChangePassword = async () => {
    setMessage('');
    setMessageType('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage('Please fill all password fields.');
      setMessageType('error');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('New password and confirm password do not match.');
      setMessageType('error');
      return;
    }
    if (!userId || !userType) {
      setMessage('User information missing. Please log in again.');
      setMessageType('error');
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
      const msg = typeof result === 'string' ? result : result?.Message;

      if (msg) {
        const trimmedMsg = msg.trim();
        setMessage(trimmedMsg);
        if (trimmedMsg.toLowerCase().includes('success')) {
          setMessageType('success');
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setTimeout(() => router.push('/'), 1500);
        } else {
          setMessageType('error');
        }
      } else {
        setMessage('Password change failed. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred while changing the password.');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center  relative px-4 py-10 md:py-30">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-[#6fd0ff] rounded-bl-[70%] opacity-30 z-0"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#ff8a65] rounded-tr-[70%] opacity-30 z-0"></div>

      {/* Main Card */}
      <div className="relative z-0 bg-white rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl">
        {/* Illustration */}
        <div className="w-full md:w-1/2">
          <Image
            src="/assets/login-security.png"
            alt="Security Illustration"
            width={500}
            height={500}
            className="object-contain"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Change Password</h2>
          <p className="text-gray-600 mb-6">
            Update your password below. Make sure your new password is strong and secure.
          </p>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {message && (
              <p
                className={`text-sm text-center ${
                  messageType === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {message}
              </p>
            )}

            <button
              onClick={handleChangePassword}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
            >
              Change Password
            </button>

            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 rounded-lg transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
