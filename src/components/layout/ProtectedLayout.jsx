import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from '../ui';
import { useAuth } from '../../context/AuthContext';
const ProtectedLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user}
        onLogout={async () => {
          await logout();
          navigate('/');
        }} 
      />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};
export default ProtectedLayout;