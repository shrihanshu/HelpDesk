import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Dashboard from "./Dashboard";
import { FaRobot, FaUserCircle } from "react-icons/fa";
import ChatBot from 'react-simple-chatbot';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const { currentUser, isAuthenticated, loading, logout } = useAuth();
  const [showBot, setShowBot] = useState(false);

  // Avatar images
  const userAvatar = <FaUserCircle className="text-2xl text-blue-400 dark:text-blue-300" />;

  // Detect theme (light/dark)
  const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains('dark');
  const botColor = isDark ? "#14b8a6" : "#2563eb"; // teal-500 for dark, blue-600 for light

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    // Check if user wants to sign up
    const urlParams = new URLSearchParams(window.location.search);
    const showSignup = urlParams.get('signup') === 'true';
    
    if (showSignup) {
      return <SignupPage />;
    }
    
    return <LoginPage />;
  }

  // If authenticated, show dashboard with user's role
  return (
    <>
      <ProtectedRoute>
        <Dashboard 
          onLogout={logout} 
          profile={currentUser?.role || "User"} 
          setProfile={() => {}} // This is now handled by auth context
          currentUser={currentUser}
        />
      </ProtectedRoute>
      
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
