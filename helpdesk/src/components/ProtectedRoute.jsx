import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [], fallback = null }) => {
  const { currentUser, isAuthenticated, loading } = useAuth();

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

  // If not authenticated, show fallback or redirect to login
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Access Denied</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  // If specific roles are required, check if user has permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role)) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Access Denied</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            You don't have permission to access this page. Required roles: {allowedRoles.join(', ')}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
            Your current role: {currentUser?.role}
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated and has required role, render children
  return children;
};

export default ProtectedRoute; 