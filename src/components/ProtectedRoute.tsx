import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Debes iniciar sesión para acceder a esta página.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
