import React, { useState } from 'react';
import { SignOutButton } from '@clerk/clerk-react';

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 flex items-center justify-center group"
      >
        <span className="text-sm font-bold text-white group-hover:scale-110 transition-transform">
          {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || 'U'}
        </span>
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden">
            {/* User Info Header */}
            <div className="px-6 py-6 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {user?.firstName?.[0] || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg truncate">
                    {user?.firstName || 'Anonymous User'}
                  </div>
                  <div className="text-sm text-zinc-400 truncate font-mono">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status Section */}
            <div className="px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-400">Online</span>
                  </div>
                  <div className="px-2 py-1 bg-white/10 rounded-md border border-white/20">
                    <span className="text-xs font-mono text-zinc-300">Anonymous Mode</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <div className="py-2">
              <button className="w-full flex items-center gap-3 px-6 py-3 text-white hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Profile Settings</span>
                <div className="ml-auto px-2 py-1 bg-white/10 rounded text-xs font-mono text-zinc-400">
                  Soon
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 px-6 py-3 text-white hover:bg-white/10 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Preferences</span>
                <div className="ml-auto px-2 py-1 bg-white/10 rounded text-xs font-mono text-zinc-400">
                  Soon
                </div>
              </button>
            </div>
            
            <div className="w-full h-px bg-white/10 my-2"></div>
            
            {/* Sign Out */}
            <div className="px-2 py-2">
              <SignOutButton>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </SignOutButton>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-white/5">
              <p className="text-xs text-zinc-400 text-center font-mono">
                Stay anonymous, stay safe
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;