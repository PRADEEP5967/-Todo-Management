import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

interface User {
  id: number;
  username: string;
  email: string;
}

interface NavbarProps {
  onSignout?: () => void;
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ onSignout, user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center text-xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            <svg className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            TaskFlow
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {/* icon */}
            <svg className={`${isMobileOpen ? 'hidden' : 'block'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg className={`${isMobileOpen ? 'block' : 'hidden'} h-6 w-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Links */}
          <div className="hidden sm:flex sm:gap-8">
            {user ? (
              <>
                <NavLink
                  to="/todos"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`
                  }
                >
                  Tasks
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`
                  }
                >
                  Settings
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`
                  }
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 text-sm font-medium transition ${isActive ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div id="mobile-menu" className="sm:hidden mt-2 pb-3 space-y-1">
            {user ? (
              <>
                <NavLink to="/todos" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Tasks</NavLink>
                <NavLink to="/profile" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Profile</NavLink>
                <NavLink to="/settings" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Settings</NavLink>
                <button onClick={onSignout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700">Sign out</button>
              </>
            ) : (
              <>
                <NavLink to="/" end className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Home</NavLink>
                <NavLink to="/signin" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Sign In</NavLink>
                <NavLink to="/signup" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>Sign Up</NavLink>
              </>
            )}
          </div>
        )}

          {/* Right side */}
          <div className="flex items-center">
            <DarkModeToggle />
            {user && (
              <div className="ml-3 relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {user.username[0].toUpperCase()}
                </button>

                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl shadow-lg py-2 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Your&nbsp;Profile</Link>
                    <Link to="/settings" className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Settings</Link>
                    <button onClick={onSignout} className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-600">
                      Sign&nbsp;out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;