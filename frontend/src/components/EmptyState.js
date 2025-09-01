import React, { useState, useEffect } from 'react';

const EmptyState = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Complete Anonymity",
      description: "Share without revealing your identity",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Safe Expression",
      description: "A judgment-free zone for your thoughts",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Community Support",
      description: "Connect through shared experiences",
      gradient: "from-purple-500/20 to-indigo-500/20"
    }
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Main Icon */}
        <div className="relative inline-block mb-12 group">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-105 transition-transform duration-500">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-white via-zinc-300 to-white bg-clip-text text-transparent">
            NO CONFESSIONS YET
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto">
          Be the pioneer of vulnerability. Share the first story that matters.
        </p>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`relative p-8 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-white/20 rounded-2xl hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>
                
                <p className="text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="relative">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-mono text-zinc-400">READY TO SHARE</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-sm font-mono text-white">USE THE CREATE TAB ABOVE</span>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full blur-xl opacity-50" />
          <blockquote className="relative text-lg italic text-zinc-300 max-w-2xl mx-auto">
            "Every great story begins with someone brave enough to speak their truth."
          </blockquote>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-30px) rotate(180deg); 
            opacity: 0.4; 
          }
        }
      `}</style>
    </div>
  );
};

export default EmptyState;