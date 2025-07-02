import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import DashboardCard from "./DashboardCard";
import { Card, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartBar, FaStar, FaRegStar, FaStarHalfAlt, FaUserFriends, FaTicketAlt, FaCheckCircle, FaHourglassHalf, FaSpinner } from "react-icons/fa";
import CreateTicketForm from "./CreateTicketForm";

const cardMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 120, damping: 15 },
  whileHover: { scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" },
};

const Dashboard = ({ onLogout, profile, setProfile }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Always keep sidebar open on desktop
  useEffect(() => {
    if (!isMobile) setSidebarOpen(true);
  }, [isMobile]);

  // When profile changes, always go to dashboard view
  useEffect(() => {
    setView("dashboard");
  }, [profile]);

  const handleNavigate = (viewName) => {
    setView(viewName);
    if (isMobile) setSidebarOpen(false);
    else setSidebarOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors">
      <div className="flex flex-1 relative">
        {(!isMobile || sidebarOpen) && (
          <Sidebar profile={profile} setSidebarOpen={setSidebarOpen} onNavigate={handleNavigate} />
        )}
        {/* Backdrop for mobile */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex-1 flex flex-col">
          <Header onSignOut={onLogout} profile={profile} setProfile={setProfile} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-6 space-y-6">
            <AnimatePresence mode="wait">
              {view === "dashboard" && (
                <motion.div
                  key={`dashboard-${profile}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                >
                  {/* Dashboard Title */}
                  <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Dashboard</h2>

                  {/* Top Cards */}
                  <div className="flex flex-wrap gap-6 justify-center">
                    <DashboardCard
                      title="Total Tickets"
                      value={12}
                      bgColor="bg-blue-500 dark:bg-blue-800"
                      textColor="text-white"
                      icon={FaTicketAlt}
                      iconBg="bg-blue-700/80 dark:bg-blue-900/80"
                      iconColor="text-blue-200"
                    />
                    <DashboardCard
                      title="Total Solved"
                      value={8}
                      bgColor="bg-green-500 dark:bg-green-800"
                      textColor="text-white"
                      icon={FaCheckCircle}
                      iconBg="bg-green-700/80 dark:bg-green-900/80"
                      iconColor="text-green-200"
                    />
                    <DashboardCard
                      title="Total Awaiting Approval"
                      value={2}
                      bgColor="bg-orange-500 dark:bg-orange-700"
                      textColor="text-white"
                      icon={FaHourglassHalf}
                      iconBg="bg-orange-700/80 dark:bg-orange-900/80"
                      iconColor="text-orange-200"
                    />
                    <DashboardCard
                      title="Total in Progress"
                      value={2}
                      bgColor="bg-yellow-400 dark:bg-yellow-600"
                      textColor="text-black"
                      icon={FaSpinner}
                      iconBg="bg-yellow-600/80 dark:bg-yellow-800/80"
                      iconColor="text-yellow-100"
                    />
                  </div>

                  {/* Add extra margin here for separation */}
                  <div className="my-8" />

                  {/* Chart + Team Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chart area */}
                    <motion.div {...cardMotion} className="w-full h-full">
                      <Card className="bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-900 dark:to-blue-700 rounded-2xl p-8 flex items-center justify-center shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-black/20 dark:hover:ring-white/30">
                        <FaChartBar size={100} className="text-blue-900 dark:text-blue-200" />
                      </Card>
                    </motion.div>

                    {/* Team Stats + Feedback */}
                    <div className="space-y-4">
                      <motion.div {...cardMotion} className="w-full h-full">
                        <Card className="bg-gradient-to-br from-teal-200 to-teal-400 dark:from-teal-900 dark:to-teal-700 rounded-2xl p-6 text-center shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-black/20 dark:hover:ring-white/30">
                          <div className="flex justify-around items-center">
                            <div>
                              <img
                                src="https://img.icons8.com/ios-filled/100/000000/technical-support.png"
                                alt="Tech Support"
                                className="mx-auto mb-2 w-12"
                              />
                              <div className="text-lg font-bold text-black dark:text-white">3</div>
                              <p className="text-sm text-black dark:text-white">Technical Supports</p>
                            </div>
                            <div>
                              <img
                                src="https://img.icons8.com/ios-filled/100/000000/administrator-male.png"
                                alt="Operations"
                                className="mx-auto mb-2 w-12"
                              />
                              <div className="text-lg font-bold text-black dark:text-white">4</div>
                              <p className="text-sm text-black dark:text-white">Operation Team</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  </div>

                  {/* Customer Feedback and Customers Section Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Customer Feedback */}
                    <motion.div {...cardMotion} className="h-full">
                      <Card className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-700 dark:to-yellow-900 rounded-2xl p-4 text-center shadow-lg transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-black/20 dark:hover:ring-white/30">
                        <h3 className="font-semibold mb-2 text-black dark:text-white">Customer Feedback</h3>
                        <div className="flex justify-center text-yellow-400 text-xl space-x-1">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStarHalfAlt />
                          <FaRegStar />
                        </div>
                      </Card>
                    </motion.div>
                    {/* Customers */}
                    <motion.div {...cardMotion} className="h-full">
                      <Card className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-400 dark:from-pink-900 dark:to-pink-700 rounded-2xl p-6 shadow-lg flex flex-col items-center transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-black/20 dark:hover:ring-white/30">
                        <div className="flex items-center gap-4 mb-4">
                          <FaUserFriends className="text-4xl text-pink-700 dark:text-pink-200" />
                          <CardTitle className="text-2xl font-bold text-black dark:text-white">Customers</CardTitle>
                        </div>
                        <div className="flex gap-8">
                          <div className="text-center">
                            <div className="text-3xl font-extrabold text-black dark:text-white">120</div>
                            <div className="text-sm text-black dark:text-white">Total Customers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-extrabold text-black dark:text-white">5</div>
                            <div className="text-sm text-black dark:text-white">New This Week</div>
                          </div>
                        </div>
                        {/* Example avatars */}
                        <div className="flex mt-6 gap-2">
                          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-700" />
                          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-700" />
                          <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-700" />
                          <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="Customer" className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-700" />
                          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-300 dark:bg-pink-800 text-black dark:text-white font-bold border-2 border-white dark:border-neutral-700">+8</span>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              {view === "new-ticket" && profile === "User" && (
                <CreateTicketForm key="new-ticket" onBack={() => setView("dashboard")} />
              )}
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 