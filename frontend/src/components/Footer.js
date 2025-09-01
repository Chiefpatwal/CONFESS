import React from 'react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/20 bg-black/90 backdrop-blur-xl overflow-hidden">
      {/* Top Glow Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Brand */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
  <img 
    src="/logo.png" 
    alt="Logo" 
    className="w-full h-full object-cover" 
  />
</div>

              <div className="absolute -inset-1 bg-white/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wider">CONFESS</h2>
              <div className="text-xs text-zinc-400 font-mono tracking-widest">ANONYMOUSLY</div>
            </div>
          </div>

          {/* Version / Year */}
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white font-mono text-xs">
              © 2025
            </div>
            <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white font-mono text-xs">
              v1.0
            </div>
          </div>
        </div>

        {/* Centered Made With Love */}
        <div className="mt-6 text-center relative z-10">
          <span className="font-medium justify-center tracking-wide text-white/80 hover:text-white transition-colors relative group">
            MADE WITH 🤍 BY 
            <span className="ml-1 text-white font-bold group-hover:tracking-wider transition-all">CHIEFPAT</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>
          </span>
        </div>
      </div>

      {/* Gradient Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white/5 to-transparent blur-2xl opacity-50" />
    </footer>
  );
};

export default Footer;
