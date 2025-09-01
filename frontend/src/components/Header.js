import React, { useState, useEffect } from 'react';
import { useAuth, useUser, SignInButton } from '@clerk/clerk-react';
import UserMenu from './UserMenu';
import useTheme from '../hooks/useTheme'; // Import the useTheme hook

const Header = ({ currentPage, onPageChange }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { theme, toggleTheme, themes } = useTheme(); // Use the updated hook
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      id: 'home',
      label: 'HOME',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'list',
      label: 'EXPLORE',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'create',
      label: 'CREATE',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
      ),
      requiresAuth: true
    }
  ];

  // Get the theme icon based on current theme
  const getThemeIcon = () => {
    switch (theme) {
      case themes.LIGHT:
        return (
          <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case themes.DARK:
      default:
        return (
          <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-xl border-b border-white/20 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onPageChange('home')}>
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -inset-1 bg-white/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div>
              <h1 className="text-xl font-black text-white tracking-wider">CONFESS</h1>
              <div className="text-xs text-zinc-400 font-mono tracking-widest">ANONYMOUSLY</div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/20 rounded-full p-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                const canAccess = !item.requiresAuth || isSignedIn;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => canAccess && onPageChange(item.id)}
                    disabled={!canAccess}
                    className={`relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-white text-black shadow-lg'
                        : canAccess
                        ? 'text-white hover:bg-white/10'
                        : 'text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    
                    {!canAccess && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            {/* <button 
              onClick={toggleTheme}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 flex items-center justify-center group"
              title={`Switch to ${theme === themes.DARK ? 'light' : 'dark'} theme`}
            >
              {getThemeIcon()}
            </button> */}
            
            {/* User Section */}
            {!isLoaded ? (
              <div className="w-10 h-10 bg-white/10 rounded-xl animate-pulse" />
            ) : isSignedIn ? (
              <UserMenu user={user} />
            ) : (
              <SignInButton>
                <button className="group relative px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-200/20 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    SIGN IN
                  </span>
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <div className="flex justify-center">
            <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/20 rounded-full p-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                const canAccess = !item.requiresAuth || isSignedIn;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => canAccess && onPageChange(item.id)}
                    disabled={!canAccess}
                    className={`relative px-4 py-2 rounded-full font-medium text-xs transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? 'bg-white text-black'
                        : canAccess
                        ? 'text-white hover:bg-white/10'
                        : 'text-zinc-600'
                    }`}
                  >
                    {item.icon}
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Header Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none transition-opacity duration-900 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
    </header>
  );
};

export default Header;