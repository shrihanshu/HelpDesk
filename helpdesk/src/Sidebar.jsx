import React, { useState } from "react";
import { FaTachometerAlt, FaTicketAlt, FaClipboardList, FaCheckCircle, FaChartLine, FaTimes, FaDatabase, FaCog, FaHistory, FaUser, FaUsers, FaHeadset, FaLifeRing } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ profile, setSidebarOpen, onNavigate }) => {
  let items = [];
  if (profile === "Admin") {
    items = [
      { icon: FaTachometerAlt, label: "Dashboard" },
      { icon: FaDatabase, label: "Database", subItems: [
        { label: "User", icon: FaUser },
        { label: "Operation Team", icon: FaUsers },
        { label: "Technical Support", icon: FaHeadset },
      ] },
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

  const [dbOpen, setDbOpen] = useState(false);

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
      <div className="flex items-center gap-3 text-3xl font-extrabold text-teal-500 mb-10 tracking-tight font-[Poppins]">
        <FaLifeRing className="text-4xl" />
        Helpdesk
      </div>
      <div className="space-y-6 w-full">
        {items.map((item) => (
          <div key={item.label}>
            <div
              className={`flex items-center space-x-3 cursor-pointer hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white px-4 py-2 rounded-lg transition-colors text-black dark:text-white ${item.label === 'Database' ? 'font-bold' : ''}`}
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
                } else if (item.label === 'Performance' && typeof onNavigate === 'function') {
                  onNavigate('performance');
                  setSidebarOpen && setSidebarOpen(false);
                } else if (item.label === 'Database') {
                  setDbOpen((prev) => !prev);
                } else if (item.label === 'Setting' && typeof onNavigate === 'function') {
                  onNavigate('setting');
                  setSidebarOpen && setSidebarOpen(false);
                } else if (item.label === 'User Log History' && typeof onNavigate === 'function') {
                  onNavigate('user-log-history');
                  setSidebarOpen && setSidebarOpen(false);
                } else {
                  setSidebarOpen && setSidebarOpen(false);
                }
              }}
            >
              <item.icon />
              <span className="font-medium">{item.label}</span>
              {item.label === 'Database' && (
                <span className="ml-auto">{dbOpen ? '▲' : '▼'}</span>
              )}
            </div>
            {/* Sub-items for Database */}
            {item.label === 'Database' && dbOpen && (
              <div className="ml-8 mt-2 space-y-2">
                {item.subItems.map((sub) => (
                  <div
                    key={sub.label}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-800 px-3 py-1 rounded-lg transition-colors text-black dark:text-white"
                    onClick={() => {
                      if (typeof onNavigate === 'function') {
                        onNavigate(`database-${sub.label.toLowerCase().replace(/ /g, '-')}`);
                        setSidebarOpen && setSidebarOpen(false);
                      }
                    }}
                  >
                    {sub.icon && <sub.icon className="mr-2" />}
                    <span>{sub.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar; 