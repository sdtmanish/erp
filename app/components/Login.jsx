'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // 1. Login API Call
      const res = await fetch('http://apidol.myportal.co.in/api/LoginUserWeb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': 'Sdt!@#321',
        },
        body: JSON.stringify({
          LoginName: username,
          Password: password,
        }),
      });

      const data = await res.json();
      console.log('🔑 Login API Response:', data);

      // 2. Check for valid login response
      if (Array.isArray(data) && data.length > 0) {
        const user = data[0]; // take only the first user
        const userId = user.UserCode;
        const userType = user.UserType;
        
        console.log('✅ User ID:', userId || 'Not found');
        console.log('✅ User Type:', userType || 'Not found');

        // 3. LeftMenu API Call using login data
        const menuRes = await fetch('http://apidol.myportal.co.in/api/LeftMenu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'APIKey': 'Sdt!@#321',
          },
          body: JSON.stringify({
            UserId: userId,
            UserType: userType,
          }),
        });

        const menuData = await menuRes.json();
        console.log('📋 Menu API Response:', menuData);

        // 4. Save data to localStorage
        localStorage.setItem('userData', JSON.stringify(user));      // store only user object
        localStorage.setItem('menuData', JSON.stringify(menuData));  // menu info

        // 5. Redirect to dashboard
        router.push('/dashboard');
      } else {
        console.warn('❌ API did not return valid user data:', data);
        alert('Login failed. Please check your username and password.');
      }
    } catch (err) {
      console.error('Login Failed:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fe] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-5xl overflow-hidden">
        
        {/* Left Illustration */}
        <div className="hidden md:flex flex-col items-center justify-center bg-white px-8 py-10 w-1/2">
          <Image
            src="/assets/login-security.png"
            alt="Login Illustration"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Right Login Form */}
        <div className="w-full md:w-1/2 bg-white px-8 py-10">
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <Image src="/assets/logo.png" alt="Logo" width={24} height={24} />
            <span className="text-xl font-semibold">Spike Admin</span>
          </div>

          {/* Welcome */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Spike Admin</h2>
          <p className="text-sm text-gray-500 mb-6">Your Admin Dashboard</p>

          {/* Social Buttons */}
          <div className="flex gap-4 mb-6">
            <button className="flex-1 border border-gray-300 text-sm py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50">
              <Image src="/assets/google-icon.svg" alt="Google" width={20} height={20} />
              Sign in with Google
            </button>
            <button className="flex-1 border border-gray-300 text-sm py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-gray-50">
              <Image src="/assets/facebook-icon.svg" alt="Facebook" width={20} height={20} />
              Sign in with FB
            </button>
          </div>

          {/* Divider */}
          <div className="text-center text-xs text-gray-400 mb-6 border-t pt-4">or sign in with</div>

          {/* Username Field */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember this Device
            </label>
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer py-3 rounded-full text-sm font-medium mb-4"
          >
            Sign In
          </button>

          {/* Create Account */}
          <p className="text-sm text-center text-gray-500">
            New to Spike?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
