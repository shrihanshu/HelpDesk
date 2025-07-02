import React from "react";

const ForgotPasswordPage = ({ onShowLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 transition-colors">
      <div className="bg-white dark:bg-neutral-800 p-10 rounded-2xl shadow-xl w-full max-w-md border border-neutral-200 dark:border-neutral-700 text-center">
        <h1 className="w-full text-4xl font-extrabold text-center text-black dark:text-white tracking-tight font-[Poppins] mb-2">
          Helpdesk System
        </h1>
        <p className="mb-6 text-lg text-neutral-700 dark:text-neutral-300">
          Don't worry, Enter your email below and we will send you a link to change password.
        </p>
        <form>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>
          <button type="submit" className="w-full bg-black hover:bg-neutral-800 focus:bg-neutral-900 text-white py-2 rounded-lg font-semibold text-lg transition mb-4 dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus:bg-neutral-300 transition-colors">
            Submit
          </button>
        </form>
        <div>
          <button type="button" className="w-full inline-block bg-black hover:bg-neutral-800 focus:bg-neutral-900 text-white py-2 rounded-lg font-semibold text-lg transition dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus:bg-neutral-300 transition-colors" onClick={onShowLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 