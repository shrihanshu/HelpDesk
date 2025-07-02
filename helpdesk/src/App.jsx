import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("dashboard");
  const [profile, setProfile] = useState("User");

  if (page === "dashboard") {
    return <Dashboard onLogout={() => setPage("login")} profile={profile} setProfile={setProfile} />;
  }
  if (page === "signup") {
    return <SignupPage onShowLogin={() => setPage("login")} onShowForgot={() => setPage("forgot")} />;
  }
  if (page === "forgot") {
    return <ForgotPasswordPage onShowLogin={() => setPage("login")} />;
  }
  return <LoginPage onShowSignup={() => setPage("signup")} onShowForgot={() => setPage("forgot")} onSignIn={() => setPage("dashboard")} />;
}

export default App;
