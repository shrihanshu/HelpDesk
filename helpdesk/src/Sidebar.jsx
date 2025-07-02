import React from "react";
import { FaTachometerAlt, FaTicketAlt, FaClipboardList, FaCheckCircle, FaChartLine, FaTimes, FaDatabase, FaCog, FaHistory } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ profile, setSidebarOpen, onNavigate }) => {
  let items = [];
  if (profile === "Admin") {
    items = [
      { icon: FaTachometerAlt, label: "Dashboard" },
      { icon: FaDatabase, label: "Database" },
      { icon: FaCog, label: "Setting" },
      { icon: FaHistory, label: "User Log History" },
    ];
  } else if (profile === "Technical Support") {
    items = [
      { icon: FaTachometerAlt, label: "Dashboard" },
      { icon: FaClipboardList, label: "My Ticket" },
      { icon: FaChartLine, label: "Performance" },
    ];
  } else if (profile === "Operation Team") {
    items = [
      { icon: FaTachometerAlt, label: "Dashboard" },
      { icon: FaCheckCircle, label: "Ticket Approval" },
      { icon: FaClipboardList, label: "My Ticket" },
      { icon: FaChartLine, label: "Performance" },
    ];
  } else {
    // Default: User
    items = [
      { icon: FaTachometerAlt, label: "Dashboard" },
      { icon: FaTicketAlt, label: "New Ticket" },
      { icon: FaClipboardList, label: "My Ticket" },
    ];
  }
  return (
    <motion.div
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      exit={{ x: -260 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="w-52 bg-gray-200 dark:bg-neutral-800 h-screen p-6 space-y-8 rounded-r-2xl shadow-lg border-r border-neutral-200 dark:border-neutral-700 flex flex-col items-center z-40 fixed md:static left-0 top-0"
    >
      {/* Close button for mobile */}
      <button
        className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-black text-white dark:bg-white dark:text-black focus:outline-none focus:ring-2 focus:ring-teal-400"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar"
      >
        <FaTimes />
      </button>
      <h1 className="text-2xl font-extrabold font-[Poppins] text-center text-black dark:text-white tracking-tight mb-8">Helpdesk</h1>
      <div className="space-y-6 w-full">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center space-x-3 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white px-4 py-2 rounded-lg transition-colors text-black dark:text-white"
            onClick={() => {
              if (item.label === 'Dashboard' && typeof onNavigate === 'function') {
                onNavigate('dashboard');
                setSidebarOpen && setSidebarOpen(false);
              } else if (item.label === 'New Ticket' && typeof onNavigate === 'function') {
                onNavigate('new-ticket');
                setSidebarOpen && setSidebarOpen(false);
              } else if (item.label === 'My Ticket' && typeof onNavigate === 'function') {
                onNavigate('my-ticket');
                setSidebarOpen && setSidebarOpen(false);
              } else {
                setSidebarOpen && setSidebarOpen(false);
              }
            }}
          >
            <item.icon />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar; 