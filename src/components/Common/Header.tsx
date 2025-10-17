import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// icons
import { UserIcon, LogOutIcon, ChevronDownIcon } from '../../utils/SVGIcons';

// utils
import { clearStorage } from '../../utils/storage';
import { ROUTE } from '../../utils/apis/routes/clientApiRoutes';
import type { HeaderProps } from '../../utils/interfaces';

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Get user data from localStorage (set during login)
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
    department: string;
  } | null>(null);

  const handleLogout = () => {
    try {
      // Navigate to login page
      navigate('/' + ROUTE.LOGIN);

      // Clear all stored data
      clearStorage();

      // Show success message
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error during logout');
    }
  };

  // Load user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Left side - Title */}
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold text-gray-900 leading-tight'>
              {title}
            </h1>
            {subtitle && (
              <p className='text-sm text-gray-600 mt-1'>{subtitle}</p>
            )}
          </div>

          {/* Right side - Profile */}
          <div className='relative' ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className='flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              {/* Avatar */}
              <div className='w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md'>
                <UserIcon className='w-5 h-5 text-white' />
              </div>

              {/* User info */}
              <div className='hidden sm:block text-left'>
                <p className='text-sm font-medium text-gray-900'>
                  {user?.name || 'Loading...'}
                </p>
                <p className='text-xs text-gray-500'>{user?.role || 'User'}</p>
              </div>

              {/* Dropdown arrow */}
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && user && (
              <div className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
                {/* User info section */}
                <div className='px-4 py-3 border-b border-gray-100'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center'>
                      <UserIcon className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>
                        {user.name}
                      </p>
                      <p className='text-xs text-gray-500'>{user.email}</p>
                      <p className='text-xs text-indigo-600 font-medium'>
                        {user.role}
                      </p>
                      <p className='text-xs text-gray-400 mt-1'>
                        {user.department}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Logout button */}
                <div className='px-2 py-1'>
                  <button
                    onClick={handleLogout}
                    className='w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200'
                  >
                    <LogOutIcon className='w-4 h-4' />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
