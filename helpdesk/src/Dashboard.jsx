import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import DashboardCard from "./DashboardCard";
import { Card, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartBar, FaStar, FaRegStar, FaStarHalfAlt, FaUserFriends, FaTicketAlt, FaCheckCircle, FaHourglassHalf, FaSpinner, FaSearch, FaClipboardList, FaUser, FaPhone, FaEnvelope, FaBuilding, FaUserEdit, FaUpload, FaEdit, FaUsers, FaDownload, FaPlus, FaSyncAlt, FaChartLine, FaDatabase, FaTrash, FaChevronDown, FaCheck, FaChevronRight, FaFileAlt } from "react-icons/fa";
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
  { ticketNo: "1234", subject: "Login issue", category: "Access issue", priority: "High", status: getRandomStatus(), supportedBy: "Tech support", date: "13/08/21" },
  { ticketNo: "1124", subject: "New ticket issue", category: "Access issue", priority: "Medium", status: getRandomStatus(), supportedBy: "Operation Team", date: "14/08/21" },
  { ticketNo: "1224", subject: "New request", category: "Feedback", priority: "Low", status: getRandomStatus(), supportedBy: "Tech support", date: "13/08/21" },
  { ticketNo: "1244", subject: "Ticket submission", category: "Ticketing", priority: "High", status: statusOptions[1], supportedBy: "Operation Team", date: "14/08/21" },
  { ticketNo: "1114", subject: "Login issue", category: "Access issue", priority: "High", status: getRandomStatus(), supportedBy: "Tech support", date: "03/08/21" },
  { ticketNo: "2001", subject: "Access problem", category: "Access issue", priority: "Medium", status: getRandomStatus(), supportedBy: "Tech support", date: "15/08/21" },
  { ticketNo: "2002", subject: "Feedback on UI", category: "Feedback", priority: "Low", status: getRandomStatus(), supportedBy: "Operation Team", date: "16/08/21" },
  { ticketNo: "2003", subject: "Ticket not closing", category: "Ticketing", priority: "High", status: getRandomStatus(), supportedBy: "Tech support", date: "17/08/21" },
  { ticketNo: "2004", subject: "Feature request", category: "Feedback", priority: "Medium", status: getRandomStatus(), supportedBy: "Operation Team", date: "18/08/21" },
  { ticketNo: "2005", subject: "Bug report", category: "Ticketing", priority: "Low", status: getRandomStatus(), supportedBy: "Tech support", date: "19/08/21" },
  { ticketNo: "3001", subject: "Slow response", category: "Access issue", priority: "High", status: getRandomStatus(), supportedBy: "Operation Team", date: "20/08/21" },
  { ticketNo: "3002", subject: "Account locked", category: "Access issue", priority: "Medium", status: getRandomStatus(), supportedBy: "Tech support", date: "21/08/21" },
  { ticketNo: "3003", subject: "Password reset", category: "Ticketing", priority: "Low", status: getRandomStatus(), supportedBy: "Operation Team", date: "22/08/21" },
  { ticketNo: "3004", subject: "App crash", category: "Feedback", priority: "High", status: getRandomStatus(), supportedBy: "Tech support", date: "23/08/21" },
  { ticketNo: "3005", subject: "General feedback", category: "Feedback", priority: "Medium", status: getRandomStatus(), supportedBy: "Operation Team", date: "24/08/21" },
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

function ProfileModal({ open, onClose, userProfile, submittedFeedback }) {
  console.log("ProfileModal - submittedFeedback:", submittedFeedback);
  if (!open) return null;
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
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-black dark:text-white flex items-center gap-2"><FaUser /> User Profile</h3>
          <div className="flex flex-col items-center gap-4 mb-4">
            <img src={userProfile.avatar} alt="User Avatar" className="w-20 h-20 rounded-full border-4 border-blue-300 shadow" />
          </div>
          <div className="flex flex-col gap-4 text-black dark:text-white">
            <div className="flex items-center gap-2"><FaUser className="text-gray-500" /> <span className="font-semibold">Username:</span> {userProfile.username}</div>
            <div className="flex items-center gap-2"><FaPhone className="text-gray-500" /> <span className="font-semibold">Contact:</span> {userProfile.contact}</div>
            <div className="flex items-center gap-2"><FaEnvelope className="text-gray-500" /> <span className="font-semibold">Email:</span> {userProfile.email}</div>
            <div className="flex items-center gap-2"><FaBuilding className="text-gray-500" /> <span className="font-semibold">Department:</span> {userProfile.department}</div>
            {userProfile.realName && <div className="flex items-center gap-2"><span className="font-semibold">Real Name:</span> {userProfile.realName}</div>}
            {userProfile.accessLevel && <div className="flex items-center gap-2"><span className="font-semibold">Access Level:</span> {userProfile.accessLevel}</div>}
            {userProfile.projectAccessLevel && <div className="flex items-center gap-2"><span className="font-semibold">Project Access Level:</span> {userProfile.projectAccessLevel}</div>}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-black dark:text-white mb-2 flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                Submitted Feedback
              </h4>
              {submittedFeedback ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Rating:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`w-4 h-4 ${
                            star <= submittedFeedback.rating
                              ? "text-yellow-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">({submittedFeedback.rating}/5)</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{submittedFeedback.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Submitted on: {submittedFeedback.date}</p>
                </>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">No feedback submitted yet.</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-8 gap-4">
            <button
              className="px-8 py-2 rounded-lg bg-green-400 hover:bg-green-500 text-white font-bold text-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={onClose}
            >
              OK
            </button>
            <button
              className="px-6 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => {
                console.log("Current submittedFeedback:", submittedFeedback);
                alert(`Feedback status: ${submittedFeedback ? 'Present - Rating: ' + submittedFeedback.rating + ', Message: ' + submittedFeedback.message : 'Not found'}`);
              }}
            >
              Debug
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function FeedbackModal({ open, onClose, feedbackText, setFeedbackText, feedbackRating, setFeedbackRating, feedbackHover, setFeedbackHover, handleFeedbackSubmit, feedbackSubmitted }) {
  if (!open) return null;
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
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
          initial={{ scale: 0.85, y: 40, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.85, y: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          onClick={e => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-black dark:text-white flex items-center gap-2"><FaStar className="text-yellow-400" /> Give Feedback</h3>
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
            <textarea
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white resize-none min-h-[80px]"
              placeholder="Write your feedback here..."
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    onMouseEnter={() => setFeedbackHover(star)}
                    onMouseLeave={() => setFeedbackHover(0)}
                    className={`text-2xl transition-colors ${
                      star <= feedbackRating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {feedbackRating && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Selected rating: {feedbackRating}/5
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-lg shadow-md hover:from-teal-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 mt-2 disabled:opacity-60"
              disabled={feedbackSubmitted}
            >
              {feedbackSubmitted ? "Submitted!" : "Submit Feedback"}
            </button>
          </form>
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
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackHover, setFeedbackHover] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [showProfileSetting, setShowProfileSetting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [userProfile, setUserProfile] = useState({
    username: "John Doe",
    contact: "+1 234 567 8901",
    email: "john.doe@example.com",
    department: "IT Support",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  });
  const [profileImage, setProfileImage] = useState(userProfile.avatar);
  const [profileForm, setProfileForm] = useState({
    username: "John Doe",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    email: "john.doe@example.com",
    realName: "John Doe",
    accessLevel: "User",
    projectAccessLevel: "Basic",
    contact: "+1 234 567 8901"
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTicket, setEditTicket] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState([""]);
  const [remark, setRemark] = useState("");
  const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [createTeamTicket, setCreateTeamTicket] = useState(null);
  const [createTeamName, setCreateTeamName] = useState("");
  const [createTeamMembers, setCreateTeamMembers] = useState([""]);
  const [createTeamRemark, setCreateTeamRemark] = useState("");
  const [otherPerfModalOpen, setOtherPerfModalOpen] = useState(false);
  const [otherPerfMember, setOtherPerfMember] = useState(null);
  const [userSearch, setUserSearch] = useState("");
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const userRowsPerPage = 5;
  const [userTable, setUserTable] = useState([
    { staffId: "ABC123", name: "Abu", department: "IT", speciality: "Software" },
    { staffId: "ABC124", name: "Ahmad", department: "Software", speciality: "Networking" },
    { staffId: "ABC125", name: "Ali", department: "Technical", speciality: "Hardware" },
    { staffId: "ABC126", name: "Sara", department: "IT", speciality: "Software" },
    { staffId: "ABC127", name: "John", department: "Software", speciality: "Networking" },
    { staffId: "ABC128", name: "Jane", department: "Technical", speciality: "Hardware" },
    { staffId: "ABC129", name: "Mike", department: "IT", speciality: "Software" },
    { staffId: "ABC130", name: "Emily", department: "Software", speciality: "Networking" },
    { staffId: "ABC131", name: "Noor", department: "Technical", speciality: "Hardware" },
    { staffId: "ABC132", name: "Zara", department: "IT", speciality: "Software" },
    { staffId: "ABC133", name: "Omar", department: "Software", speciality: "Networking" },
    { staffId: "ABC134", name: "Lina", department: "Technical", speciality: "Hardware" },
    { staffId: "ABC135", name: "Sam", department: "IT", speciality: "Software" },
    { staffId: "ABC136", name: "Ava", department: "Software", speciality: "Networking" },
    { staffId: "ABC137", name: "Ray", department: "Technical", speciality: "Hardware" },
  ]);
  const [userEditIdx, setUserEditIdx] = useState(null);
  const [userDeleteIdx, setUserDeleteIdx] = useState(null);
  const [settingsAccordion, setSettingsAccordion] = useState({
    general: true,
    connect: false,
    email: false,
    authorization: false,
    notification: false,
  });
  const [lang, setLang] = useState("BM");
  const [authLevel, setAuthLevel] = useState("BI");
  const toggleAccordion = (key) => setSettingsAccordion((prev) => ({ ...prev, [key]: !prev[key] }));

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

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackRating) {
      alert("Please select a rating before submitting feedback.");
      return;
    }
    const newFeedback = {
      message: feedbackText,
      rating: feedbackRating,
      date: new Date().toLocaleDateString()
    };
    console.log("Submitting feedback:", newFeedback);
    setSubmittedFeedback(newFeedback);
    setFeedbackText("");
    setFeedbackRating(0);
    setFeedbackHover(0);
    setFeedbackModalOpen(false);
    alert("Feedback submitted successfully! Check your profile to view it.");
  };

  const handleProfileInput = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      username: profileForm.username,
      contact: profileForm.contact,
      email: profileForm.email,
      realName: profileForm.realName,
      accessLevel: profileForm.accessLevel,
      projectAccessLevel: profileForm.projectAccessLevel,
      avatar: profileImage,
    }));
    setShowProfileSetting(false);
  };

  const filteredUserTable = userTable.filter(row =>
    Object.values(row).some(val => String(val).toLowerCase().includes(userSearch.toLowerCase()))
  );
  const userTotalPages = Math.ceil(filteredUserTable.length / userRowsPerPage);
  const paginatedUserTable = filteredUserTable.slice((userCurrentPage - 1) * userRowsPerPage, userCurrentPage * userRowsPerPage);

  const handleSettingAction = (action) => {
    switch(action) {
      case 'backup':
        console.log('Data backup started!');
        break;
      case 'godash':
        console.log('GoDash connected!');
        break;
      case 'supercontroller':
        console.log('SuperController connected!');
        break;
      case 'smtp':
        console.log('SMTP enabled!');
        break;
      case 'edit-auth':
        console.log('Authorization edited!');
        break;
      case 'notification':
        console.log('Notification enabled!');
        break;
      default:
        break;
    }
  };

  // Generate 15 random log entries for 3 pages
  const randomDepts = ["OT", "IT", "HR", "TS"];
  const randomActs = ["Create Team", "Login", "Logout", "Edit Profile", "Reset Password", "Approve Ticket", "Close Ticket"];
  function randomDateTime(idx) {
    const base = 130821;
    const inTime = 800 + (idx * 5);
    const outTime = inTime + 15;
    return {
      signIn: `${base} / ${inTime}`,
      signOut: `${base} / ${outTime}`
    };
  }
  const userLogHistoryData = Array.from({ length: 15 }, (_, i) => {
    const dt = randomDateTime(i);
    return {
      no: i + 1,
      signIn: dt.signIn,
      staffId: `XL${String(100000 + i).padStart(6, '0')}`,
      dept: randomDepts[i % randomDepts.length],
      activity: randomActs[i % randomActs.length],
      signOut: dt.signOut
    };
  });
  const [logEntriesPerPage, setLogEntriesPerPage] = useState(10);
  const [logCurrentPage, setLogCurrentPage] = useState(1);
  const logTotalPages = Math.ceil(userLogHistoryData.length / logEntriesPerPage);
  const paginatedLogHistory = userLogHistoryData.slice((logCurrentPage - 1) * logEntriesPerPage, logCurrentPage * logEntriesPerPage);

  // 1. Add a placeholder download function
  const handleDownload = (ticket) => {
    alert(`Download for Ticket #${ticket.ticketNo} is not implemented yet.`);
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
                profile === "User" ? (
                  <motion.div
                    key="dashboard-user"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  >
                    {/* Dashboard Title */}
                    <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Dashboard</h2>
                    {/* Four top cards */}
                    <div className="flex flex-wrap gap-6 justify-center mb-8">
                      <DashboardCard
                        title="Total Tickets"
                        value={12}
                        bgColor="bg-blue-500 dark:bg-blue-800"
                        textColor="text-white"
                        icon={FaTicketAlt}
                        iconBg="bg-blue-700/80 dark:bg-blue-900/80"
                        iconColor="text-blue-200"
                        numberColor="text-blue-100"
                      />
                      <DashboardCard
                        title="Total Solved"
                        value={8}
                        bgColor="bg-green-500 dark:bg-green-800"
                        textColor="text-white"
                        icon={FaCheckCircle}
                        iconBg="bg-green-700/80 dark:bg-green-900/80"
                        iconColor="text-green-200"
                        numberColor="text-green-100"
                      />
                      <DashboardCard
                        title="Total Awaiting Approval"
                        value={2}
                        bgColor="bg-orange-500 dark:bg-orange-700"
                        textColor="text-white"
                        icon={FaHourglassHalf}
                        iconBg="bg-orange-700/80 dark:bg-orange-900/80"
                        iconColor="text-orange-200"
                        numberColor="text-orange-100"
                      />
                      <DashboardCard
                        title="Total in Progress"
                        value={2}
                        bgColor="bg-yellow-400 dark:bg-yellow-600"
                        textColor="text-black"
                        icon={FaSpinner}
                        iconBg="bg-yellow-600/80 dark:bg-yellow-800/80"
                        iconColor="text-yellow-100"
                        numberColor="text-yellow-100"
                      />
                    </div>
                    {/* User Profile and Give Feedback cards */}
                    <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
                      {/* User Profile Card */}
                      <motion.div {...cardMotion} className="flex-1 min-w-[320px]">
                        <Card
                          className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 rounded-2xl p-6 shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-black/20 dark:hover:ring-white/30"
                          onClick={() => setProfileModalOpen(true)}
                        >
                          <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-black dark:text-white">
                            <FaUser className="text-2xl" /> User Profile
                          </h3>
                          <p className="text-black dark:text-white text-base">Click to view profile details</p>
                        </Card>
                      </motion.div>
                      {/* Give Feedback Card */}
                      <motion.div {...cardMotion} className="flex-1 min-w-[320px]">
                        <Card
                          className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-700 dark:to-yellow-900 rounded-2xl p-6 shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-black/20 dark:hover:ring-white/30"
                          onClick={() => setFeedbackModalOpen(true)}
                        >
                          <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-black dark:text-white">
                            <FaStar className="text-yellow-500 text-2xl" /> Give Feedback
                          </h3>
                          <p className="text-black dark:text-white text-base">Click to give feedback and rating</p>
                        </Card>
                      </motion.div>
                    </div>
                    {/* User Setting Button */}
                    <div className="flex justify-center mb-8">
                      <button
                        className="px-8 py-3 rounded-lg bg-teal-400 hover:bg-teal-500 text-white font-bold text-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 flex items-center gap-2"
                        onClick={() => setShowProfileSetting(true)}
                      >
                        <FaUserEdit /> User Setting
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`dashboard-${profile}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  >
                    {/* Dashboard Title */}
                    <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Dashboard</h2>

                    {/* Show all dashboard cards for all profiles */}
                    <div className="flex flex-wrap gap-6 justify-center">
                      <DashboardCard
                        title="Total Tickets"
                        value={12}
                        bgColor="bg-blue-500 dark:bg-blue-800"
                        textColor="text-white"
                        icon={FaTicketAlt}
                        iconBg="bg-blue-700/80 dark:bg-blue-900/80"
                        iconColor="text-blue-200"
                        numberColor="text-blue-100"
                      />
                      <DashboardCard
                        title="Total Solved"
                        value={8}
                        bgColor="bg-green-500 dark:bg-green-800"
                        textColor="text-white"
                        icon={FaCheckCircle}
                        iconBg="bg-green-700/80 dark:bg-green-900/80"
                        iconColor="text-green-200"
                        numberColor="text-green-100"
                      />
                      <DashboardCard
                        title="Total Awaiting Approval"
                        value={2}
                        bgColor="bg-orange-500 dark:bg-orange-700"
                        textColor="text-white"
                        icon={FaHourglassHalf}
                        iconBg="bg-orange-700/80 dark:bg-orange-900/80"
                        iconColor="text-orange-200"
                        numberColor="text-orange-100"
                      />
                      <DashboardCard
                        title="Total in Progress"
                        value={2}
                        bgColor="bg-yellow-400 dark:bg-yellow-600"
                        textColor="text-black"
                        icon={FaSpinner}
                        iconBg="bg-yellow-600/80 dark:bg-yellow-800/80"
                        iconColor="text-yellow-100"
                        numberColor="text-yellow-100"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
                )
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
              {view === "my-ticket" && profile === "Technical Support" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-black dark:text-white font-[Poppins] text-center flex items-center justify-center gap-3">
                    <FaClipboardList className="inline text-teal-600 dark:text-teal-300 text-3xl" />
                    My Ticket
                  </h2>
                  {/* Page navigation dropdown */}
                  <div className="flex justify-end items-center mb-4">
                    <label htmlFor="page-select-ts" className="mr-2 text-black dark:text-white font-medium">Page:</label>
                    <select
                      id="page-select-ts"
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
                        placeholder="Find ticket"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700">
                    <table className="min-w-full bg-white dark:bg-neutral-900">
                      <thead>
                        <tr className="bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900">
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white rounded-tl-2xl">Ticket No.</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Subject</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Category</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Priority</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Date</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Status</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Person in charge</th>
                          <th className="px-4 py-3 text-center text-base font-bold text-black dark:text-white rounded-tr-2xl">Action</th>
                        </tr>
                      </thead>
                      <AnimatePresence mode="wait">
                        <motion.tbody
                          key={currentPage + '-' + search + '-ts'}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 80, damping: 18 }}
                        >
                          {paginatedTickets.map((ticket, idx) => (
                            <tr key={ticket.ticketNo} className={idx % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-800" : "bg-white dark:bg-neutral-900"}>
                              <td
                                className="px-4 py-3 text-blue-700 underline cursor-pointer hover:text-blue-900 transition font-semibold"
                                onClick={() => { setSelectedTicket(ticket); setModalOpen(true); }}
                              >
                                {ticket.ticketNo}
                              </td>
                              <td className="px-4 py-3 text-black dark:text-white font-medium">{ticket.subject}</td>
                              <td className="px-4 py-3 text-black dark:text-white font-medium">{ticket.category || "Access issue"}</td>
                              <td className="px-4 py-3 text-black dark:text-white font-medium">{ticket.priority || ["High","Medium","Low"][idx%3]}</td>
                              <td className="px-4 py-3 text-black dark:text-white font-medium">{ticket.date}</td>
                              <td className="px-4 py-3">
                                <span className={`px-3 py-1 rounded-full font-semibold text-sm ${ticket.status.color}`}>{ticket.status.label}</span>
                              </td>
                              <td className="px-4 py-3 text-black dark:text-white font-medium">{ticket.supportedBy}</td>
                              <td className="px-4 py-3 text-center flex items-center gap-3 justify-center">
                                <button className="hover:text-blue-600" title="Edit Ticket" onClick={() => { setEditTicket(ticket); setEditModalOpen(true); }}><FaEdit /></button>
                                <button className="hover:text-green-600" title="Create Team" onClick={() => { setCreateTeamTicket(ticket); setCreateTeamModalOpen(true); }}><FaUsers /></button>
                                <button className="hover:text-gray-700" title="Download" onClick={() => handleDownload(ticket)}><FaDownload /></button>
                              </td>
                            </tr>
                          ))}
                        </motion.tbody>
                      </AnimatePresence>
                    </table>
                  </div>
                  <div className="mt-2 text-sm text-black dark:text-white text-center">Showing 1 to 5 of 5 entries</div>
                </div>
              )}
              {view === "performance" && profile === "Technical Support" && (
                <div className="flex flex-col items-center w-full">
                  <motion.h2
                    className="text-3xl font-bold mb-8 text-black dark:text-white font-[Poppins] flex items-center justify-center gap-3"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  >
                    <FaChartLine className="text-teal-600 dark:text-teal-300 text-3xl" />
                    Performance
                  </motion.h2>
                  <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
                    {/* Left/Main Section */}
                    <div className="flex-1 flex flex-col gap-8">
                      <motion.div
                        className="flex flex-col md:flex-row items-center bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-700"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
                      >
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Technical Support"
                          className="w-32 h-32 rounded-full border-4 border-teal-400 shadow-md object-cover mb-4 md:mb-0"
                        />
                        <div className="ml-0 md:ml-8 flex flex-col items-center md:items-start">
                          <h2 className="text-2xl font-bold text-black dark:text-white mb-2">John Doe</h2>
                          <motion.div
                            className="bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 rounded-xl p-4 shadow flex flex-col gap-2 w-64"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 }}
                          >
                            <div className="text-black dark:text-white font-semibold">Contact No.: <span className="font-normal">+1 234 567 8901</span></div>
                            <div className="text-black dark:text-white font-semibold">Department: <span className="font-normal">IT Support</span></div>
                          </motion.div>
                        </div>
                      </motion.div>
                      <motion.div
                        className="bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-700 dark:to-yellow-900 rounded-2xl p-6 shadow-xl flex flex-col items-center border border-neutral-200 dark:border-neutral-700"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.25 }}
                      >
                        <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Total Tickets Handled</h3>
                        <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold text-black dark:text-white">Tickets Solved</span>
                            <span className="text-3xl font-extrabold text-green-600 dark:text-green-400">120</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold text-black dark:text-white">Tickets Pending</span>
                            <span className="text-3xl font-extrabold text-orange-500 dark:text-orange-300">8</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold text-black dark:text-white">Tickets In Progress</span>
                            <span className="text-3xl font-extrabold text-yellow-600 dark:text-yellow-300">5</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-semibold text-black dark:text-white">Rating</span>
                            <div className="flex gap-1 mt-1">
                              {[1,2,3,4,5].map((star) => (
                                <FaStar key={star} className="text-yellow-400 text-2xl" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    {/* Right Section: Other Technical Supports */}
                    <motion.div
                      className="w-full md:w-80 flex-shrink-0 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-200 dark:border-neutral-700 flex flex-col gap-6"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.3 }}
                    >
                      <h4 className="text-lg font-bold text-black dark:text-white mb-4">Other Technical Supports</h4>
                      {[
                        { name: "Jane Smith", img: "https://randomuser.me/api/portraits/women/44.jpg" },
                        { name: "Mike Johnson", img: "https://randomuser.me/api/portraits/men/65.jpg" },
                        { name: "Emily Brown", img: "https://randomuser.me/api/portraits/women/22.jpg" },
                      ].map((member, idx) => (
                        <motion.div
                          key={member.name}
                          className="flex items-center gap-4 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 rounded-xl p-3 shadow"
                          initial={{ opacity: 0, x: 30 * (idx + 1) }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.35 + idx * 0.05 }}
                        >
                          <img src={member.img} alt={member.name} className="w-14 h-14 rounded-full border-2 border-teal-400 object-cover" />
                          <div className="flex-1">
                            <div className="text-base font-semibold text-black dark:text-white">{member.name}</div>
                          </div>
                          <button
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold shadow hover:from-teal-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
                            onClick={() => { setOtherPerfMember(member); setOtherPerfModalOpen(true); }}
                          >
                            View Details
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}
              {view === "database-user" && profile === "Admin" && (
                <motion.div
                  key="database-user"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="w-full"
                >
                  <h2 className="text-2xl font-bold mb-6 text-black dark:text-white font-[Poppins] text-center flex items-center justify-center gap-3">
                    <FaDatabase className="inline text-teal-600 dark:text-teal-300 text-3xl" />
                    Database
                  </h2>
                  {/* Search and page dropdown */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <div className="relative w-full max-w-xs mx-auto md:mx-0">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaSearch />
                      </span>
                      <input
                        type="text"
                        value={userSearch}
                        onChange={e => { setUserSearch(e.target.value); setUserCurrentPage(1); }}
                        placeholder="Find ticket"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white shadow-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-center md:justify-end">
                      <label htmlFor="user-page-select" className="text-black dark:text-white font-medium">Page:</label>
                      <select
                        id="user-page-select"
                        value={userCurrentPage}
                        onChange={e => setUserCurrentPage(Number(e.target.value))}
                        className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white shadow-sm"
                      >
                        {Array.from({ length: userTotalPages }, (_, i) => (
                          <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Table */}
                  <div className="overflow-x-auto rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700">
                    <table className="min-w-full bg-white dark:bg-neutral-900">
                      <thead>
                        <tr className="bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900">
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white rounded-tl-2xl"><input type="checkbox" disabled /></th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Staff ID</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Name</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Department</th>
                          <th className="px-4 py-3 text-left text-base font-bold text-black dark:text-white">Speciality</th>
                          <th className="px-4 py-3 text-center text-base font-bold text-black dark:text-white rounded-tr-2xl">Setting</th>
                        </tr>
                      </thead>
                      <AnimatePresence mode="wait">
                        <motion.tbody
                          key={userCurrentPage + '-' + userSearch}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                        >
                          {paginatedUserTable.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="text-center py-8 text-neutral-500 dark:text-neutral-400">No entries found.</td>
                            </tr>
                          ) : (
                            paginatedUserTable.map((row, idx) => (
                              <tr key={row.staffId} className={idx % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-800" : "bg-white dark:bg-neutral-900"}>
                                <td className="px-4 py-3 text-center"><input type="checkbox" /></td>
                                <td className="px-4 py-3 text-black dark:text-white font-semibold">{row.staffId}</td>
                                <td className="px-4 py-3 text-black dark:text-white font-medium">{row.name}</td>
                                <td className="px-4 py-3 text-black dark:text-white font-medium">{row.department}</td>
                                <td className="px-4 py-3 text-black dark:text-white font-medium">{row.speciality}</td>
                                <td className="px-4 py-3 text-center flex items-center gap-4 justify-center">
                                  <button className="hover:text-blue-600" title="Edit" onClick={() => setUserEditIdx(row.staffId)}><FaUserEdit /></button>
                                  <button className="hover:text-red-600" title="Delete" onClick={() => setUserDeleteIdx(row.staffId)}><FaTrash /></button>
                                </td>
                              </tr>
                            ))
                          )}
                        </motion.tbody>
                      </AnimatePresence>
                    </table>
                  </div>
                  <div className="mt-2 text-sm text-black dark:text-white text-center">Showing {paginatedUserTable.length} of {filteredUserTable.length} entries (Page {userCurrentPage} of {userTotalPages})</div>
                </motion.div>
              )}
              {view === "setting" && profile === "Admin" && (
                <motion.div
                  key="setting-admin"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="w-full"
                >
                  <h2 className="text-3xl font-bold mb-8 text-black dark:text-white font-[Poppins] text-left">Setting</h2>
                  <div className="space-y-4">
                    {/* General */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <button onClick={() => toggleAccordion('general')} className="w-full flex items-center justify-between px-6 py-3 bg-teal-400 text-white font-bold text-lg focus:outline-none">
                        General
                        <FaChevronDown className={`ml-2 transition-transform ${settingsAccordion.general ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {settingsAccordion.general && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-100 dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700"
                          >
                            <div className="flex items-center justify-between px-8 py-4">
                              <span className="text-black dark:text-white">Language</span>
                              <div className="flex gap-2">
                                <button onClick={() => { setLang('BM'); console.log('Language set to BM'); }} className={`px-2 py-1 rounded bg-black text-white text-xs font-bold ${lang === 'BM' ? 'opacity-100' : 'opacity-60'}`}>BM</button>
                                <button onClick={() => { setLang('BI'); console.log('Language set to BI'); }} className={`px-2 py-1 rounded bg-black text-white text-xs font-bold ${lang === 'BI' ? 'opacity-100' : 'opacity-60'}`}>BI</button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between px-8 py-4">
                              <span className="text-black dark:text-white">Data Backup</span>
                              <button onClick={() => handleSettingAction('backup')} className="focus:outline-none"><FaCheck className="text-black dark:text-white" /></button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Connect To */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <button onClick={() => toggleAccordion('connect')} className="w-full flex items-center justify-between px-6 py-3 bg-teal-400 text-white font-bold text-lg focus:outline-none">
                        Connect To
                        <FaChevronDown className={`ml-2 transition-transform ${settingsAccordion.connect ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {settingsAccordion.connect && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-100 dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700"
                          >
                            <div className="flex items-center justify-between px-8 py-4">
                              <span className="text-black dark:text-white">GoDash</span>
                              <button onClick={() => handleSettingAction('godash')} className="focus:outline-none"><FaCheck className="text-black dark:text-white" /></button>
                            </div>
                            <div className="flex items-center justify-between px-8 py-4">
                              <span className="text-black dark:text-white">SuperController</span>
                              <button onClick={() => handleSettingAction('supercontroller')} className="focus:outline-none"><FaCheck className="text-black dark:text-white" /></button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Email */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <button onClick={() => toggleAccordion('email')} className="w-full flex items-center justify-between px-6 py-3 bg-teal-400 text-white font-bold text-lg focus:outline-none">
                        Email
                        <FaChevronDown className={`ml-2 transition-transform ${settingsAccordion.email ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {settingsAccordion.email && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-100 dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700"
                          >
                            <div className="flex items-center justify-between px-8 py-4">
                              <span className="text-black dark:text-white">Enable SMTP</span>
                              <button onClick={() => handleSettingAction('smtp')} className="focus:outline-none"><FaCheck className="text-black dark:text-white" /></button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Authorization */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <button onClick={() => toggleAccordion('authorization')} className="w-full flex items-center justify-between px-6 py-3 bg-teal-400 text-white font-bold text-lg focus:outline-none">
                        Authorization
                        <FaChevronDown className={`ml-2 transition-transform ${settingsAccordion.authorization ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {settingsAccordion.authorization && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-100 dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700"
                          >
                            <div className="flex items-center justify-between px-8 py-4">
                              <span className="text-black dark:text-white">Edit authorization</span>
                              <button onClick={() => handleSettingAction('edit-auth')} className="focus:outline-none"><FaCheck className="text-black dark:text-white" /></button>
                            </div>
                            <div className="flex items-center justify-between px-8 py-4">
                              <span className="text-black dark:text-white">Authority Level</span>
                              <div className="relative">
                                <select value={authLevel} onChange={e => { setAuthLevel(e.target.value); console.log('Authority Level set to ' + e.target.value); }} className="rounded bg-neutral-300 dark:bg-neutral-700 px-4 py-1 focus:outline-none">
                                  <option value="BM">BM</option>
                                  <option value="BI">BI</option>
                                </select>
                                <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {/* Notification */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <button onClick={() => toggleAccordion('notification')} className="w-full flex items-center justify-between px-6 py-3 bg-teal-400 text-white font-bold text-lg focus:outline-none">
                        Notification
                        <FaChevronDown className={`ml-2 transition-transform ${settingsAccordion.notification ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {settingsAccordion.notification && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-100 dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700"
                          >
                            <div className="flex items-center justify-between px-8 py-4">
                              <span className="text-black dark:text-white">Enable Notification</span>
                              <button onClick={() => handleSettingAction('notification')} className="focus:outline-none"><FaCheck className="text-black dark:text-white" /></button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
              {view === "user-log-history" && profile === "Admin" && (
                <motion.div
                  key="user-log-history"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="w-full"
                >
                  <div className="flex justify-center w-full">
                    <h2 className="text-3xl font-bold mb-8 text-black dark:text-white font-[Poppins] flex items-center gap-3">
                      <FaFileAlt className="text-teal-600 dark:text-teal-300 text-2xl" />
                      User Log History
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-black dark:text-white">Show:</span>
                    <select
                      value={logEntriesPerPage}
                      onChange={e => { setLogEntriesPerPage(Number(e.target.value)); setLogCurrentPage(1); }}
                      className="rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-2 py-1 text-black dark:text-white"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>
                    <span className="text-black dark:text-white">Entries</span>
                  </div>
                  <div className="overflow-x-auto rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700">
                    <table className="min-w-full bg-white dark:bg-neutral-900">
                      <thead>
                        <tr className="bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900">
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white rounded-tl-2xl">No.</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white">Date/Sign InTime</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white">Staff ID</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white">Department</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white">Activity</th>
                          <th className="px-6 py-4 text-left text-base font-bold text-black dark:text-white rounded-tr-2xl">Date/Sign Out time</th>
                        </tr>
                      </thead>
                      <AnimatePresence mode="wait">
                        <motion.tbody
                          key={logCurrentPage + '-' + logEntriesPerPage}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                        >
                          {paginatedLogHistory.map((row, idx) => (
                            <tr key={row.no} className={idx % 2 === 0 ? "bg-neutral-50 dark:bg-neutral-800" : "bg-white dark:bg-neutral-900"}>
                              <td className="px-6 py-3 text-black dark:text-white font-semibold">{row.no}.</td>
                              <td className="px-6 py-3 text-black dark:text-white font-medium">{row.signIn}</td>
                              <td className="px-6 py-3 text-black dark:text-white font-medium">{row.staffId}</td>
                              <td className="px-6 py-3 text-black dark:text-white font-medium">{row.dept}</td>
                              <td className="px-6 py-3 text-black dark:text-white font-medium">{row.activity}</td>
                              <td className="px-6 py-3 text-black dark:text-white font-medium">{row.signOut}</td>
                            </tr>
                          ))}
                        </motion.tbody>
                      </AnimatePresence>
                    </table>
                  </div>
                  <div className="mt-2 text-sm text-black dark:text-white text-center">Showing {(logCurrentPage - 1) * logEntriesPerPage + 1} to {Math.min(logCurrentPage * logEntriesPerPage, userLogHistoryData.length)} of {userLogHistoryData.length} entries</div>
                  <div className="flex justify-end items-center gap-2 mt-2 text-black dark:text-white text-sm">
                    <button onClick={() => setLogCurrentPage(1)} disabled={logCurrentPage === 1} className="px-2 py-1 rounded disabled:opacity-50">&laquo;</button>
                    {Array.from({ length: logTotalPages }, (_, i) => (
                      <button key={i+1} onClick={() => setLogCurrentPage(i+1)} className={`px-2 py-1 rounded ${logCurrentPage === i+1 ? 'bg-teal-400 text-white' : ''}`}>{i+1}</button>
                    ))}
                    <button onClick={() => setLogCurrentPage(logTotalPages)} disabled={logCurrentPage === logTotalPages} className="px-2 py-1 rounded disabled:opacity-50">&raquo;</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
      <AppTicketModal ticket={selectedTicket} open={modalOpen} onClose={() => setModalOpen(false)} />
      {/* Always render ProfileModal and FeedbackModal for user dashboard functionality */}
      <ProfileModal open={profileModalOpen} onClose={() => setProfileModalOpen(false)} userProfile={userProfile} submittedFeedback={submittedFeedback} />
      <FeedbackModal open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} feedbackText={feedbackText} setFeedbackText={setFeedbackText} feedbackRating={feedbackRating} setFeedbackRating={setFeedbackRating} feedbackHover={feedbackHover} setFeedbackHover={setFeedbackHover} handleFeedbackSubmit={handleFeedbackSubmit} feedbackSubmitted={feedbackSubmitted} />
      {showProfileSetting && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex flex-col items-center relative"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                onClick={() => setShowProfileSetting(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold text-center mb-6 text-black dark:text-white font-[Poppins]">User Profile</h2>
              <button
                className="mb-6 px-6 py-2 rounded-t-lg bg-teal-400 text-white font-semibold text-lg shadow hover:bg-teal-500 transition flex items-center gap-2"
                type="button"
              >
                <FaUserEdit /> Edit Account
              </button>
              <form onSubmit={handleProfileUpdate} className="w-full flex flex-col gap-4">
                <div className="flex flex-col items-center mb-4">
                  <img src={profileImage} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-blue-300 shadow mb-2" />
                  <label className="flex items-center gap-2 cursor-pointer text-teal-600 hover:text-teal-800">
                    <FaUpload />
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      value={profileForm.username}
                      onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number</label>
                    <input
                      type="tel"
                      value={profileForm.contact}
                      onChange={(e) => setProfileForm({...profileForm, contact: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={profileForm.currentPassword}
                      onChange={(e) => setProfileForm({...profileForm, currentPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <input
                    type="password"
                    name="newPassword"
                    value={profileForm.newPassword}
                    onChange={handleProfileInput}
                    placeholder="New Password"
                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={profileForm.confirmPassword}
                    onChange={handleProfileInput}
                    placeholder="Confirm Password"
                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                  />
                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileInput}
                    placeholder="Email"
                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    name="realName"
                    value={profileForm.realName}
                    onChange={handleProfileInput}
                    placeholder="Real Name"
                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="accessLevel"
                    value={profileForm.accessLevel}
                    onChange={handleProfileInput}
                    placeholder="Access Level"
                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                  />
                  <input
                    type="text"
                    name="projectAccessLevel"
                    value={profileForm.projectAccessLevel}
                    onChange={handleProfileInput}
                    placeholder="Project Access Level"
                    className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full py-2 rounded-lg bg-teal-400 hover:bg-teal-500 text-white font-bold text-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  Update User
                </button>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {editModalOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-black dark:text-white font-[Poppins]">My Ticket-Close Ticket</h3>
              <form className="space-y-5 animate-in fade-in slide-in-from-bottom-6" onSubmit={e => { e.preventDefault(); alert('Ticket closed successfully!'); setEditModalOpen(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-black dark:text-white">Ticket No.</label>
                    <input
                      type="text"
                      value={editTicket?.ticketNo || ""}
                      disabled
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-black dark:text-white">Team Name</label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={e => setTeamName(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-black dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black dark:text-white">Team Member</label>
                  <div className="flex gap-2">
                    {teamMembers.map((member, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={member}
                        onChange={e => setTeamMembers(teamMembers.map((m, i) => i === idx ? e.target.value : m))}
                        className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-black dark:text-white"
                        placeholder={`Member ${idx + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      className="p-2 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 shadow-md text-white flex items-center justify-center transition-all duration-200 border-2 border-white dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      onClick={() => setTeamMembers([...teamMembers, ""])}
                      title="Add Team Member"
                    >
                      <FaPlus className="text-lg" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black dark:text-white">Remark</label>
                  <textarea
                    value={remark}
                    onChange={e => setRemark(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-black dark:text-white"
                    placeholder="Enter remark..."
                  />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-lg shadow-md hover:from-teal-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    Close Ticket
                  </button>
                  <button
                    type="button"
                    className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-black dark:text-white shadow transition"
                    title="Reload"
                    onClick={() => { setTeamName(""); setTeamMembers([""]); setRemark(""); }}
                  >
                    <FaSyncAlt />
                  </button>
                </div>
              </form>
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                onClick={() => setEditModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {createTeamModalOpen && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCreateTeamModalOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-black dark:text-white font-[Poppins]">My Ticket-Team Creation</h3>
              <form className="space-y-5 animate-in fade-in slide-in-from-bottom-6" onSubmit={e => { e.preventDefault(); alert('Team created successfully!'); setCreateTeamModalOpen(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-black dark:text-white">Ticket No.</label>
                    <input
                      type="text"
                      value={createTeamTicket?.ticketNo || ""}
                      disabled
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-black dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-black dark:text-white">Team Name</label>
                    <input
                      type="text"
                      value={createTeamName}
                      onChange={e => setCreateTeamName(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-black dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black dark:text-white">Team Member</label>
                  <div className="flex gap-2">
                    {createTeamMembers.map((member, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={member}
                        onChange={e => setCreateTeamMembers(createTeamMembers.map((m, i) => i === idx ? e.target.value : m))}
                        className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-black dark:text-white"
                        placeholder={`Member ${idx + 1}`}
                      />
                    ))}
                    <button type="button" className="p-2 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 shadow-md text-white flex items-center justify-center transition-all duration-200 border-2 border-white dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-teal-400" onClick={() => setCreateTeamMembers([...createTeamMembers, ""])} title="Add Team Member">
                      <FaPlus className="text-lg" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-black dark:text-white">Remark</label>
                  <textarea
                    value={createTeamRemark}
                    onChange={e => setCreateTeamRemark(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-black dark:text-white"
                    placeholder="Enter remark..."
                  />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold text-lg shadow-md hover:from-teal-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    Create Team
                  </button>
                  <button
                    type="button"
                    className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-black dark:text-white shadow transition"
                    title="Reload"
                    onClick={() => { setCreateTeamName(""); setCreateTeamMembers([""]); setCreateTeamRemark(""); }}
                  >
                    <FaSyncAlt />
                  </button>
                </div>
              </form>
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                onClick={() => setCreateTeamModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {otherPerfModalOpen && otherPerfMember && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOtherPerfModalOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative"
              initial={{ scale: 0.85, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-8 text-center text-black dark:text-white font-[Poppins] flex items-center justify-center gap-3">
                <FaChartLine className="text-teal-600 dark:text-teal-300 text-3xl" />
                Performance
              </h3>
              <div className="flex flex-col md:flex-row gap-8 w-full">
                {/* Left/Main Section */}
                <div className="flex-1 flex flex-col gap-8">
                  <motion.div
                    className="flex flex-col md:flex-row items-center bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-700"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 }}
                  >
                    <img
                      src={otherPerfMember.img}
                      alt={otherPerfMember.name}
                      className="w-32 h-32 rounded-full border-4 border-teal-400 shadow-md object-cover mb-4 md:mb-0"
                    />
                    <div className="ml-0 md:ml-8 flex flex-col items-center md:items-start">
                      <h2 className="text-2xl font-bold text-black dark:text-white mb-2">{otherPerfMember.name}</h2>
                      <motion.div
                        className="bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900 dark:to-teal-900 rounded-xl p-4 shadow flex flex-col gap-2 w-64"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.2 }}
                      >
                        <div className="text-black dark:text-white font-semibold">Contact No.: <span className="font-normal">+1 987 654 321{otherPerfMember.name.length}</span></div>
                        <div className="text-black dark:text-white font-semibold">Department: <span className="font-normal">IT Support</span></div>
                      </motion.div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-700 dark:to-yellow-900 rounded-2xl p-6 shadow-xl flex flex-col items-center border border-neutral-200 dark:border-neutral-700"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.25 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Total Tickets Handled</h3>
                    <div className="flex flex-col md:flex-row gap-8 w-full justify-between">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold text-black dark:text-white">Tickets Solved</span>
                        <span className="text-3xl font-extrabold text-green-600 dark:text-green-400">{100 + otherPerfMember.name.length}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold text-black dark:text-white">Tickets Pending</span>
                        <span className="text-3xl font-extrabold text-orange-500 dark:text-orange-300">{5 + otherPerfMember.name.length}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold text-black dark:text-white">Tickets In Progress</span>
                        <span className="text-3xl font-extrabold text-yellow-600 dark:text-yellow-300">{2 + otherPerfMember.name.length}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-semibold text-black dark:text-white">Rating</span>
                        <div className="flex gap-1 mt-1">
                          {[1,2,3,4,5].map((star) => (
                            <FaStar key={star} className="text-yellow-400 text-2xl" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <button
                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                onClick={() => setOtherPerfModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Dashboard; 