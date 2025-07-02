import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { FaUser, FaLock } from "react-icons/fa";

// Add a Google Fonts import for 'Poppins' in index.html for best effect

const LoginPage = ({ onShowSignup, onShowForgot, onSignIn }) => {
  // State to track dark mode
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  // Effect to update <html> class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Toggle handler
  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors">
      <div className="bg-white dark:bg-neutral-800 p-10 rounded-2xl shadow-xl w-full max-w-md border border-neutral-200 dark:border-neutral-700">
        <div className="flex justify-between items-center mb-8">
          <h1 className="w-full text-4xl font-extrabold text-center text-black dark:text-white tracking-tight font-[Poppins]">
            Helpdesk System
          </h1>
          <button
            className="ml-2 p-2 rounded-full bg-neutral-100 dark:bg-neutral-700 transition-colors"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            type="button"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
        
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

          <div className="mb-6">
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 pl-10 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>
          </div>

          <button
            className="w-full mb-4 bg-black hover:bg-neutral-800 focus:bg-neutral-900 text-white border-none dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus:bg-neutral-300 transition-colors rounded-lg py-2 font-semibold text-lg"
            onClick={onSignIn}
            type="button"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
          <button type="button" className="hover:underline text-black dark:text-white bg-transparent border-none outline-none cursor-pointer transition-colors" onClick={onShowForgot}>
            Forgot password
          </button>
          <button type="button" className="hover:underline text-black dark:text-white bg-transparent border-none outline-none cursor-pointer transition-colors" onClick={onShowSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 