import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from './Spinner'; 

function ProtectedRoute() {
  const { userLoggedIn, loading } = useAuth();

  if (loading) {
    return <Spinner />; 
  }

  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;