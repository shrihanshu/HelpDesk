import { useAuth } from '../contexts/AuthContext';

export const useRoleAccess = () => {
  const { currentUser } = useAuth();

  const hasRole = (requiredRoles) => {
    if (!currentUser) return false;
    
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(currentUser.role);
    }
    
    return currentUser.role === requiredRoles;
  };

  const isAdmin = () => hasRole('Admin');
  const isUser = () => hasRole('User');
  const isTechSupport = () => hasRole('Technical Support');
  const isOperationTeam = () => hasRole('Operation Team');

  const canManageUsers = () => hasRole(['Admin']);
  const canManageTickets = () => hasRole(['Admin', 'Technical Support', 'Operation Team']);
  const canViewAnalytics = () => hasRole(['Admin', 'Technical Support', 'Operation Team']);
  const canCreateTickets = () => hasRole(['User', 'Admin', 'Technical Support', 'Operation Team']);
  const canAssignTickets = () => hasRole(['Admin', 'Technical Support', 'Operation Team']);

  return {
    currentRole: currentUser?.role,
    hasRole,
    isAdmin,
    isUser,
    isTechSupport,
    isOperationTeam,
    canManageUsers,
    canManageTickets,
    canViewAnalytics,
    canCreateTickets,
    canAssignTickets,
  };
}; 