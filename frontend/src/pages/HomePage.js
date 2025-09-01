import React, { useState, useEffect } from 'react';
import { useAuth, SignInButton } from '@clerk/clerk-react';

const HomePage = ({ onPageChange, confessionCount = 0 }) => {
  const { isSignedIn } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Complete Anonymity",
      description: "Share your thoughts without revealing your identity",
      hoverText: "Your personal information is never collected or stored. No usernames, no profiles—just pure anonymous expression.",
      benefits: ["No tracking cookies", "IP addresses anonymized", "Zero personal data collection"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Safe Expression Space",
      description: "A judgment-free environment for honest sharing",
      hoverText: "Moderated community guidelines ensure respectful discourse while protecting your freedom to express authentic thoughts.",
      benefits: ["24/7 content moderation", "Anti-harassment policies", "Mental health resources available"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Supportive Community",
      description: "Connect through shared human experiences",
      hoverText: "Join thousands who've found comfort in shared stories. Our community offers understanding without judgment.",
      benefits: ["Active supportive community", "Diverse perspectives welcome", "Real human connections"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            transition: 'background 0.5s ease'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-zinc-300 to-white bg-clip-text text-transparent">
              SHARE YOUR STORY
            </span>
          </h1>

          {/* Improved Subtitle with SEO focus */}
          <div className="space-y-4 mb-8">
            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-3xl mx-auto leading-relaxed">
              Anonymous confessions, personal stories, heartfelt messages, and creative poetry
            </p>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
              A trusted platform where authenticity meets anonymity. Share what matters most without fear of judgment.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="text-sm font-mono text-zinc-300">100% Anonymous</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="text-sm font-mono text-zinc-300">Safe & Secure</span>
            </div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <span className="text-sm font-mono text-zinc-300">Moderated Community</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => onPageChange('list')}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span className="flex items-center gap-2">
                READ STORIES
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </button>

            {isSignedIn ? (
              <button
                onClick={() => onPageChange('create')}
                className="group relative px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  SHARE YOUR STORY
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
            ) : (
              <SignInButton>
                <button className="group relative px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                  <span className="flex items-center gap-2">
                    SIGN IN TO SHARE
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </span>
                </button>
              </SignInButton>
            )}
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-500 transform ${hoveredFeature === index ? 'scale-105 -translate-y-2 bg-white/10 border-white/20' : ''}`}>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                
                <p className="text-zinc-400 leading-relaxed mb-4">
                  {hoveredFeature === index ? feature.hoverText : feature.description}
                </p>

                {/* Benefits list on hover */}
                {hoveredFeature === index && (
                  <div className="space-y-2 animate-fadeIn">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Section */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-xl rounded-full" />
            {/* <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"> */}
              {/* <blockquote className="text-lg md:text-xl font-light italic text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-4">
                "In the safety of anonymity, we find the courage to speak our deepest truths"
              </blockquote> */}
              {/* <p className="text-sm text-zinc-500">Join thousands sharing authentic stories daily</p> */}
            {/* </div> */}
          {/* </div> */} 
        </div>

        {/* Content Categories */}
        {/* <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {['Confessions', 'Life Stories', 'Messages', 'Poetry'].map((category, index) => (
            <div key={category} className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h4 className="font-semibold text-white mb-1">{category}</h4>
              <p className="text-sm text-zinc-400">Share & discover</p>
            </div>
          ))}
        </div> */}
      </div>

      {/* Floating Action */}
      <div className="fixed bottom-8 right-8 z-20">
        <div className="relative group">
          <button
            onClick={() => onPageChange(isSignedIn ? 'create' : 'list')}
            className="w-16 h-16 bg-white text-black rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group-hover:shadow-white/20"
            title={isSignedIn ? 'Share your story' : 'Read stories'}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSignedIn ? "M12 4v16m8-8H4" : "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"} />
            </svg>
          </button>
          
          <div className="absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;