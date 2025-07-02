import React from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignupPage = ({ onShowLogin, onShowForgot }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors">
      <div className="bg-white dark:bg-neutral-800 p-10 rounded-2xl shadow-xl w-full max-w-md border border-neutral-200 dark:border-neutral-700">
        <h1 className="w-full text-4xl font-extrabold text-center text-black dark:text-white tracking-tight font-[Poppins] mb-2">
          Helpdesk System
        </h1>
        <p className="text-center mb-6 text-neutral-700 dark:text-neutral-300">Sign up here</p>
        <form>
          <div className="mb-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 pl-10 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 pl-10 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 pl-10 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-black hover:bg-neutral-800 focus:bg-neutral-900 text-white py-2 rounded-lg font-semibold text-lg transition mb-4 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus:bg-neutral-300 transition-colors">
            Sign Up
          </button>
        </form>
        <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
          <button type="button" className="hover:underline text-black dark:text-white bg-transparent border-none outline-none cursor-pointer transition-colors" onClick={onShowForgot}>
            Forgot password
          </button>
          <button type="button" className="hover:underline text-black dark:text-white bg-transparent border-none outline-none cursor-pointer transition-colors" onClick={onShowLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 