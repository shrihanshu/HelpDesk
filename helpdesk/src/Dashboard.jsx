import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import DashboardCard from "./DashboardCard";
import { Card, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartBar, FaStar, FaRegStar, FaStarHalfAlt, FaUserFriends, FaTicketAlt, FaCheckCircle, FaHourglassHalf, FaSpinner, FaSearch, FaClipboardList } from "react-icons/fa";
import CreateTicketForm from "./CreateTicketForm";

const cardMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 120, damping: 15 },
  whileHover: { scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" },
};

// Generate 15 random tickets for 3 pages, now with status
const statusOptions = [
  { label: "In Progress", color: "bg-green-300 text-green-900" },
  { label: "On hold", color: "bg-yellow-400 text-yellow-900" },
  { label: "Closed", color: "bg-red-400 text-red-900" },
];
function getRandomStatus() {
  return statusOptions[Math.floor(Math.random() * statusOptions.length)];
}
const ticketData = [
  { ticketNo: "1234", subject: "Login issue", status: getRandomStatus(), supportedBy: "Tech support", date: "13/08/21", rating: 0 },
  { ticketNo: "1124", subject: "New ticket issue", status: getRandomStatus(), supportedBy: "Operation Team", date: "14/08/21", rating: 0 },
  { ticketNo: "1224", subject: "New request", status: getRandomStatus(), supportedBy: "Tech support", date: "13/08/21", rating: 4.5 },
  { ticketNo: "1244", subject: "Ticket submission", status: statusOptions[1], supportedBy: "Operation Team", date: "14/08/21", rating: 0 },
  { ticketNo: "1114", subject: "Login issue", status: getRandomStatus(), supportedBy: "Tech support", date: "03/08/21", rating: 0 },
  { ticketNo: "2001", subject: "Access problem", status: getRandomStatus(), supportedBy: "Tech support", date: "15/08/21", rating: 3 },
  { ticketNo: "2002", subject: "Feedback on UI", status: getRandomStatus(), supportedBy: "Operation Team", date: "16/08/21", rating: 2.5 },
  { ticketNo: "2003", subject: "Ticket not closing", status: getRandomStatus(), supportedBy: "Tech support", date: "17/08/21", rating: 5 },
  { ticketNo: "2004", subject: "Feature request", status: getRandomStatus(), supportedBy: "Operation Team", date: "18/08/21", rating: 1 },
  { ticketNo: "2005", subject: "Bug report", status: getRandomStatus(), supportedBy: "Tech support", date: "19/08/21", rating: 4 },
  { ticketNo: "3001", subject: "Slow response", status: getRandomStatus(), supportedBy: "Operation Team", date: "20/08/21", rating: 2 },
  { ticketNo: "3002", subject: "Account locked", status: getRandomStatus(), supportedBy: "Tech support", date: "21/08/21", rating: 3.5 },
  { ticketNo: "3003", subject: "Password reset", status: getRandomStatus(), supportedBy: "Operation Team", date: "22/08/21", rating: 0 },
  { ticketNo: "3004", subject: "App crash", status: getRandomStatus(), supportedBy: "Tech support", date: "23/08/21", rating: 4.5 },
  { ticketNo: "3005", subject: "General feedback", status: getRandomStatus(), supportedBy: "Operation Team", date: "24/08/21", rating: 1.5 },
];

function AppTicketModal({ ticket, open, onClose }) {
  if (!open || !ticket) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-black dark:text-white font-[Poppins]">Ticket Details</h3>
          <div className="space-y-2 text-black dark:text-white text-base">
            <div><span className="font-semibold">Ticket No.:</span> {ticket.ticketNo}</div>
            <div><span className="font-semibold">Date:</span> {ticket.date || '-'}</div>
            <div><span className="font-semibold">Name:</span> {ticket.name || '-'}</div>
            <div><span className="font-semibold">Dept:</span> {ticket.department || '-'}</div>
            <div className="mt-4"><span className="font-semibold">Title:</span> {ticket.subject || '-'}</div>
            <div><span className="font-semibold">Description:</span> {ticket.description || '-'}</div>
            <div><span className="font-semibold">Category:</span> {ticket.category || '-'}</div>
            <div><span className="font-semibold">Type:</span> {ticket.type || '-'}</div>
            <div><span className="font-semibold">Priority:</span> {ticket.priority || '-'}</div>
            <div><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded-full font-semibold text-sm ${ticket.status?.color}`}>{ticket.status?.label || '-'}</span></div>
            <div><span className="font-semibold">Attachment:</span> {ticket.attachment || '-'}</div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="px-8 py-2 rounded-lg bg-green-400 hover:bg-green-500 text-white font-bold text-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const Dashboard = ({ onLogout, profile, setProfile }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  // Filter tickets by search
  const filteredTickets = ticketData.filter(ticket =>
    Object.values(ticket).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage);

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.value));
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
              {view === "my-ticket" && profile === "User" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-black dark:text-white font-[Poppins] text-center flex items-center justify-center gap-3">
                    <FaClipboardList className="inline text-teal-600 dark:text-teal-300 text-3xl" />
                    List Of Tickets
                  </h2>
                  {/* Page navigation dropdown */}
                  <div className="flex justify-end items-center mb-4">
                    <label htmlFor="page-select" className="mr-2 text-black dark:text-white font-medium">Page:</label>
                    <select
                      id="page-select"
                      value={currentPage}
                      onChange={handlePageChange}
                      className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white shadow-sm"
                    >
                      {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                      ))}
                    </select>
                  </div>
                  {/* Search box with icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-full max-w-md">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        value={search}
                        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                        placeholder="Search tickets..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700">
                    <table className="min-w-full bg-white dark:bg-neutral-900">
                      <thead>
                        <tr className="bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900">
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white rounded-tl-2xl">Ticket No.</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white">Subject</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white">Status</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white">Supported By</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white">Date</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white rounded-tr-2xl">Ratings</th>
                        </tr>
                      </thead>
                      <AnimatePresence mode="wait">
                        <motion.tbody
                          key={currentPage + '-' + search}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                        >
                          {paginatedTickets.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center py-8 text-neutral-500 dark:text-neutral-400">No tickets found.</td>
                            </tr>
                          ) : (
                            paginatedTickets.map((ticket, idx) => (
                              <tr key={ticket.ticketNo} className={idx % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-800" : "bg-white dark:bg-neutral-900"}>
                                <td
                                  className="px-6 py-3 text-blue-700 underline cursor-pointer hover:text-blue-900 transition font-semibold"
                                  onClick={() => { setSelectedTicket(ticket); setModalOpen(true); }}
                                >
                                  {ticket.ticketNo}
                                </td>
                                <td className="px-6 py-3 text-black dark:text-white font-medium">{ticket.subject}</td>
                                <td className="px-6 py-3">
                                  <span className={`px-3 py-1 rounded-full font-semibold text-sm ${ticket.status.color}`}>{ticket.status.label}</span>
                                </td>
                                <td className="px-6 py-3 text-black dark:text-white font-medium">{ticket.supportedBy}</td>
                                <td className="px-6 py-3 text-black dark:text-white font-medium">{ticket.date}</td>
                                <td className="px-6 py-3">
                                  {[1,2,3,4,5].map((star) => {
                                    if (ticket.rating >= star) {
                                      return <FaStar key={star} className="inline text-yellow-400 text-lg" />;
                                    } else if (ticket.rating >= star - 0.5) {
                                      return <FaStarHalfAlt key={star} className="inline text-yellow-400 text-lg" />;
                                    } else {
                                      return <FaRegStar key={star} className="inline text-gray-300 text-lg" />;
                                    }
                                  })}
                                </td>
                              </tr>
                            ))
                          )}
                        </motion.tbody>
                      </AnimatePresence>
                    </table>
                  </div>
                  <div className="mt-2 text-sm text-black dark:text-white text-center">Showing {paginatedTickets.length} of {filteredTickets.length} entries (Page {currentPage} of {totalPages})</div>
                </div>
              )}
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
      <AppTicketModal ticket={selectedTicket} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Dashboard; 