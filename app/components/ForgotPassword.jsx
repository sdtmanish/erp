"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
export default function ForgotPassword() {

    const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f8ff] relative overflow-hidden px-4">
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

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer  hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
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
