import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaSignOutAlt, FaUser, FaUserShield, FaHeadset, FaUsersCog, FaBars } from "react-icons/fa";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const roleIcons = {
  "User": FaUser,
  "Admin": FaUserShield,
  "Technical Support": FaHeadset,
  "Operation Team": FaUsersCog,
};

const Header = ({ onSignOut, profile, currentUser, sidebarOpen, setSidebarOpen }) => {
  const [lang, setLang] = useState("BM");
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef();
  
  // Get the appropriate icon for the current role
  const CurrentIcon = roleIcons[profile] || FaUser;

  // Close notification on outside click
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    if (notifOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [notifOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="bg-white dark:bg-black flex justify-between items-center px-6 py-2 border-b border-neutral-200 dark:border-neutral-700"
    >
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setSidebarOpen(true)}
        className="md:hidden mr-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-black text-white dark:bg-white dark:text-black"
        aria-label="Open sidebar"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3, type: "spring", stiffness: 200 }}
      >
        <FaBars className="text-lg" />
      </motion.button>
      <motion.h2
        className="text-xl font-semibold text-black dark:text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4, type: "spring", stiffness: 180 }}
      >
        Dashboard
      </motion.h2>
      <div className="flex items-center space-x-4 relative">
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (lang !== "BM") {
                setLang("BM");
                console.log("Language set to BM");
              }
            }}
            className={`px-2 py-1 rounded bg-black text-white text-xs font-bold transition-opacity ${lang === 'BM' ? 'opacity-100' : 'opacity-60'}`}
          >
            BM
          </button>
          <button
            onClick={() => {
              if (lang !== "BI") {
                setLang("BI");
                console.log("Language set to BI");
              }
            }}
            className={`px-2 py-1 rounded bg-black text-white text-xs font-bold transition-opacity ${lang === 'BI' ? 'opacity-100' : 'opacity-60'}`}
          >
            BI
          </button>
        </div>
        
        {/* User Profile Display */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-3 py-2 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <CurrentIcon className="text-lg" />
              <div className="hidden sm:block text-left">
                <div className="text-xs opacity-90">{currentUser?.profile?.realName || 'User'}</div>
                <div className="text-xs opacity-75">{profile}</div>
              </div>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50 w-64">
            <div className="p-3 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                <img 
                  src={currentUser?.profile?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold text-black dark:text-white">
                    {currentUser?.profile?.realName || 'User'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {currentUser?.profile?.email || 'user@example.com'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {profile}
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <FaUser className="text-lg" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <FaBell className="text-lg" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onSignOut}
              className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <FaBell
            className="cursor-pointer text-black dark:text-white"
            onClick={() => setNotifOpen((v) => !v)}
          />
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                ref={notifRef}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 8, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 overflow-hidden"
                style={{ top: '100%' }}
              >
                <div className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-700 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 flex items-center justify-between">
                  <span className="font-bold text-black dark:text-white text-lg">Notifications</span>
                  <button className="text-xs text-gray-500 hover:text-red-500" onClick={() => setNotifOpen(false)}>Close</button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-200 dark:divide-neutral-700">
                  {/* Sample notifications */}
                  <div className="px-5 py-4 flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                    <div>
                      <div className="font-semibold text-black dark:text-white">Ticket #1234 resolved</div>
                      <div className="text-xs text-gray-500">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 mt-2"></span>
                    <div>
                      <div className="font-semibold text-black dark:text-white">New feedback received</div>
                      <div className="text-xs text-gray-500">10 minutes ago</div>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                    <div>
                      <div className="font-semibold text-black dark:text-white">System update scheduled</div>
                      <div className="text-xs text-gray-500">1 hour ago</div>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                    <div>
                      <div className="font-semibold text-black dark:text-white">Backup failed</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-2 text-center text-sm text-teal-600 dark:text-teal-300 bg-neutral-50 dark:bg-neutral-800 cursor-pointer hover:underline">View all notifications</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Header; 