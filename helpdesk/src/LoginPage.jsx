import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "./contexts/AuthContext";

// Add a Google Fonts import for 'Poppins' in index.html for best effect

const LoginPage = ({ onShowSignup, onShowForgot, onSignIn }) => {
  const { login } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        console.log(result.message);
        onSignIn();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        
        {/* Demo Credentials Info */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Demo Credentials:</h3>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <div><strong>User:</strong> user / user123</div>
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>Tech Support:</strong> techsupport / tech123</div>
            <div><strong>Operation Team:</strong> operation / operation123</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="mb-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-3 pl-10 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 pl-10 pr-12 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            className="w-full mb-4 bg-black hover:bg-neutral-800 focus:bg-neutral-900 text-white border-none dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus:bg-neutral-300 transition-colors rounded-lg py-2 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
          <button type="button" className="hover:underline text-black dark:text-white bg-transparent border-none outline-none cursor-pointer transition-colors" onClick={onShowForgot}>
            Forgot password
          </button>
          <button 
            type="button" 
            className="hover:underline text-black dark:text-white bg-transparent border-none outline-none cursor-pointer transition-colors" 
            onClick={() => window.location.href = '?signup=true'}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 