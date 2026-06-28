import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slateBg">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Verifying Session credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // If not authenticated, redirect to sign-in page
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Authenticated but does not possess authorized role
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'technician') return <Navigate to="/technician" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized
  return children;
}
