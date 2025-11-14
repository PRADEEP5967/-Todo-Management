import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Layout must be used within AuthProvider');
  }

  const { user, signout } = authContext;

  const handleSignout = () => {
    signout();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onSignout={handleSignout} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
