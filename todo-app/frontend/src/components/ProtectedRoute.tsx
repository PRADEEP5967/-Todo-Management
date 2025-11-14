import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error('ProtectedRoute must be used within an AuthProvider');
  }
  
  const { token } = authContext;
  
  if (!token) {
    // User is not authenticated
    return <Navigate to="/signin" />;
  }
  
  // User is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;