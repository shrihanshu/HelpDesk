import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Dashboard from "./Dashboard";
import { FaRobot, FaUserCircle } from "react-icons/fa";
import ChatBot from 'react-simple-chatbot';

function App() {
  const [page, setPage] = useState("dashboard");
  const [profile, setProfile] = useState("User");
  const [showBot, setShowBot] = useState(false);

  // Avatar images
  const userAvatar = <FaUserCircle className="text-2xl text-blue-400 dark:text-blue-300" />;

  // Detect theme (light/dark)
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
  const botColor = isDark ? "#14b8a6" : "#2563eb"; // teal-500 for dark, blue-600 for light

  let content;
  if (page === "dashboard") {
    content = <Dashboard onLogout={() => setPage("login")} profile={profile} setProfile={setProfile} />;
  } else if (page === "signup") {
    content = <SignupPage onShowLogin={() => setPage("login")} onShowForgot={() => setPage("forgot")} />;
  } else if (page === "forgot") {
    content = <ForgotPasswordPage onShowLogin={() => setPage("login")} />;
  } else {
    content = <LoginPage onShowSignup={() => setPage("signup")} onShowForgot={() => setPage("forgot")} onSignIn={() => setPage("dashboard")} />;
  }

  return (
    <>
      {content}
      {/* Floating AI Assistant Chatbot */}
      {showBot && (
        <>
          {/* Backdrop overlay for closing chatbot on click */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setShowBot(false)}
          />
          <div className="fixed bottom-24 right-6 z-50 shadow-2xl rounded-2xl overflow-hidden" style={{ width: 340 }}>
            <ChatBot
              steps={[
                { id: '1', message: 'Hi! I am your AI Assistant. How can I help you today?', trigger: '2' },
                { id: '2', user: true, trigger: '3' },
                { id: '3', message: 'Thank you for your message! I will get back to you soon.', end: true },
              ]}
              botAvatar={<FaRobot className="text-2xl" style={{ color: botColor }} />}
              userAvatar={userAvatar}
              floating={false}
              hideHeader={false}
              placeholder="Type your message..."
              style={{ borderRadius: 16, boxShadow: isDark ? '0 8px 32px #0f172a' : '0 8px 32px #cbd5e1' }}
              contentStyle={{ borderRadius: 16, background: isDark ? '#1e293b' : '#fff' }}
              headerTitle={<span className="flex items-center gap-2"><FaRobot style={{ color: botColor }} /> AI Assistant</span>}
              customStyle={{ background: isDark ? '#1e293b' : '#fff', color: isDark ? '#fff' : '#222' }}
              bubbleStyle={{ background: botColor, color: '#fff', borderRadius: 16 }}
              userBubbleStyle={{ background: isDark ? '#334155' : '#e0e7ef', color: isDark ? '#fff' : '#222', borderRadius: 16 }}
            />
          </div>
        </>
      )}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-full shadow-lg p-4 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
        aria-label="Open AI Assistant"
        onClick={() => setShowBot((prev) => !prev)}
        style={{ background: isDark ? 'linear-gradient(135deg, #14b8a6, #2563eb)' : 'linear-gradient(135deg, #2563eb, #14b8a6)' }}
      >
        <FaRobot className="text-2xl" />
      </button>
    </>
  );
}

export default App;
