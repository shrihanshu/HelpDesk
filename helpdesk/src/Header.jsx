import React from "react";
import { FaBell, FaSignOutAlt, FaUser, FaUserShield, FaHeadset, FaUsersCog, FaBars } from "react-icons/fa";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

const profiles = [
  { label: "User", icon: FaUser },
  { label: "Admin", icon: FaUserShield },
  { label: "Technical Support", icon: FaHeadset },
  { label: "Operation Team", icon: FaUsersCog },
];

const Header = ({ onSignOut, profile, setProfile, sidebarOpen, setSidebarOpen }) => {
  const current = profiles.find((p) => p.label === profile) || profiles[0];
  const CurrentIcon = current.icon;
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
      <div className="flex items-center space-x-4">
        <motion.button
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3, type: "spring", stiffness: 200 }}
          className="bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          BI/BM
        </motion.button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3, type: "spring", stiffness: 200 }}
              className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-2 py-1 rounded text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <CurrentIcon className="text-lg" />
              <span className="hidden sm:inline">{current.label}</span>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50">
            <AnimatePresence>
              {profiles.map((p) => {
                const Icon = p.icon;
                return (
                  <DropdownMenuItem
                    key={p.label}
                    onClick={() => setProfile(p.label)}
                    className={profile === p.label ? "font-bold bg-teal-100 dark:bg-neutral-800 flex items-center gap-2" : "flex items-center gap-2"}
                  >
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Icon className="text-lg" />
                    </motion.span>
                    <span>{p.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </AnimatePresence>
          </DropdownMenuContent>
        </DropdownMenu>
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <FaBell className="cursor-pointer text-black dark:text-white" />
        </motion.span>
        <motion.button
          onClick={onSignOut}
          aria-label="Sign out"
          className="bg-transparent border-none p-0 m-0 cursor-pointer"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <FaSignOutAlt className="text-black dark:text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Header; 