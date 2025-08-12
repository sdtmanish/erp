'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // ✅ Added
  const [userLoginName, setUserLoginName] = useState('');
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.UserCode && user?.UserType) {
          setUserId(user.UserCode);
          setUserType(user.UserType);
          setUserLoginName(user.LoginName);
        } else {
          setMessage('User data is incomplete. Please log in again.');
          setMessageType('error');
        }
      } else {
        setMessage('User not logged in or session expired.');
        setMessageType('error');
      }
    } catch (err) {
      console.error('Error reading user data:', err);
      setMessage('Error reading user data.');
      setMessageType('error');
    }
  }, []);

  const handleForgotPassword = async (e) => {
  e.preventDefault();

  try {
    const fpResponse = await fetch('http://apidol.myportal.co.in/api/FP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': 'Sdt!@#321',
      },
      body: JSON.stringify({
        LoginName: userLoginName,
        UserType: userType,
        Email: email,
      }),
    });

    const result = await fpResponse.json();

    if (result === "Not A Valid User") {
      setMessage("Invalid email or user details. Please try again.");
      setMessageType("error");
    } else {
      setMessage(result?.message || "Password reset link sent successfully.");
      setMessageType("success");
    }

  } catch (err) {
    console.error('Error during forgot password:', err);
    setMessage('Something went wrong. Please try again.');
    setMessageType('error');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden px-4">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-[#6fd0ff] rounded-bl-[70%] opacity-30 z-0"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#ff8a65] rounded-tr-[70%] opacity-30 z-0"></div>

      {/* Main Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl">
        {/* Illustration */}
        <div className="w-full md:w-1/2">
          <Image
            src="/assets/login-security.png"
            alt="Illustration"
            width={500}
            height={500}
            className="object-contain"
            priority
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot your password?</h2>
          <p className="text-gray-600 mb-6">
            Please enter the email address associated with your account and we’ll email you a link to reset your password.
          </p>

          <form className="space-y-4" onSubmit={handleForgotPassword}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {message && (
              <p className={`text-sm text-center ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
            >
              Forgot Password
            </button>

            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full bg-blue-100 cursor-pointer hover:bg-blue-200 text-blue-700 py-3 rounded-lg transition duration-300"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
