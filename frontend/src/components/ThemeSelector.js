import React, { useState, useEffect } from 'react';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { 
      name: 'light', 
      label: 'Light Mode', 
      preview: 'bg-white border-zinc-300',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      name: 'dark', 
      label: 'Dark Mode', 
      preview: 'bg-zinc-800 border-zinc-600',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    { 
      name: 'black', 
      label: 'Pure Black',
      preview: 'bg-black border-zinc-700',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      name: 'luxury', 
      label: 'Luxury',
      preview: 'bg-amber-50 border-amber-200',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    setIsOpen(false);
  };

  const getCurrentTheme = () => {
    return themes.find(t => t.name === currentTheme) || themes[0];
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-zinc-600 hover:text-black border border-zinc-200 hover:border-black bg-white hover:bg-zinc-50 transition-all duration-200 relative"
        title="Change theme"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          {getCurrentTheme().icon}
        </div>
        
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-black flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-72 bg-white border-2 border-zinc-200 shadow-2xl z-50">
            {/* Header */}
            <div className="px-6 py-4 border-b-2 border-zinc-100 bg-zinc-50">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span className="font-medium text-zinc-900 text-sm tracking-wide uppercase">
                  Theme Selection
                </span>
              </div>
            </div>
            
            {/* Theme options */}
            <div className="py-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeChange(theme.name)}
                  className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 transition-all duration-200 ${
                    currentTheme === theme.name ? 'bg-zinc-50 border-r-4 border-black' : ''
                  }`}
                >
                  <div className={`w-10 h-10 ${theme.preview} border-2 flex items-center justify-center`}>
                    <div className="text-zinc-600">
                      {theme.icon}
                    </div>
                  </div>
                  
                  <div className="text-left flex-1">
                    <div className="font-medium text-zinc-900 text-sm mb-1">
                      {theme.label}
                    </div>
                    <div className="text-xs text-zinc-500 capitalize font-mono">
                      {theme.name} theme
                    </div>
                  </div>
                  
                  {currentTheme === theme.name && (
                    <div className="w-5 h-5 bg-black flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 1.194z" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t-2 border-zinc-100 bg-zinc-50">
              <p className="text-xs text-zinc-600 text-center font-mono">
                Preference automatically saved
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;