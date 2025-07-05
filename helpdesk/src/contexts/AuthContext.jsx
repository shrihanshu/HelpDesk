import React, { createContext, useContext, useState, useEffect } from 'react';

// Predefined users for each role
const predefinedUsers = {
  user: {
    username: 'user',
    password: 'user123',
    role: 'User',
    profile: {
      username: 'user',
      realName: 'John Doe',
      email: 'user@helpdesk.com',
      contact: '+1-555-0123',
      department: 'General',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      accessLevel: 'Standard',
      projectAccessLevel: 'Basic'
    }
  },
  admin: {
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
    profile: {
      username: 'admin',
      realName: 'Admin User',
      email: 'admin@helpdesk.com',
      contact: '+1-555-0124',
      department: 'Administration',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      accessLevel: 'Administrator',
      projectAccessLevel: 'Full'
    }
  },
  techsupport: {
    username: 'techsupport',
    password: 'tech123',
    role: 'Technical Support',
    profile: {
      username: 'techsupport',
      realName: 'Tech Support User',
      email: 'tech@helpdesk.com',
      contact: '+1-555-0125',
      department: 'Technical Support',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      accessLevel: 'Technical Support',
      projectAccessLevel: 'Advanced'
    }
  },
  operation: {
    username: 'operation',
    password: 'operation123',
    role: 'Operation Team',
    profile: {
      username: 'operation',
      realName: 'Operation Team User',
      email: 'operation@helpdesk.com',
      contact: '+1-555-0126',
      department: 'Operations',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      accessLevel: 'Operation Team',
      projectAccessLevel: 'Standard'
    }
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('helpdesk_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('helpdesk_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // Find user by username
    const user = Object.values(predefinedUsers).find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );

    if (user && user.password === password) {
      const userData = {
        ...user,
        loginTime: new Date().toISOString()
      };
      
      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('helpdesk_user', JSON.stringify(userData));
      
      return {
        success: true,
        user: userData,
        message: `Welcome back, ${user.profile.realName}!`
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password. Please try again.'
      };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('helpdesk_user');
  };

  const updateUserProfile = (updatedProfile) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        profile: {
          ...currentUser.profile,
          ...updatedProfile
        }
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('helpdesk_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUserProfile,
    predefinedUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 