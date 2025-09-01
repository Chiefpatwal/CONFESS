import React from 'react';

const LoadingSkeletons = ({ count = 4 }) => {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center mb-16 animate-pulse">
        <div className="w-96 h-16 bg-white/10 rounded-2xl mx-auto mb-4" />
        <div className="w-64 h-6 bg-white/5 rounded-xl mx-auto" />
      </div>

      {/* Cards Skeletons */}
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="group relative"
          style={{ animationDelay: `${i * 200}ms` }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-2xl opacity-50 animate-pulse" />
          
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
            {/* Card Number */}
            <div className="absolute top-6 left-6 z-10">
              <div className="w-8 h-8 bg-white/10 rounded-lg animate-pulse" />
            </div>

            <div className="p-8 pt-16">
              {/* Content Skeleton */}
              <div className="space-y-4 mb-8 animate-pulse">
                <div className="w-full h-6 bg-white/10 rounded-xl" />
                <div className="w-5/6 h-6 bg-white/10 rounded-xl" />
                <div className="w-4/6 h-6 bg-white/10 rounded-xl" />
                <div className="w-3/6 h-6 bg-white/10 rounded-xl" />
              </div>
              
              {/* Divider */}
              <div className="w-full h-px bg-white/10 mb-6" />
              
              {/* Footer Skeleton */}
              <div className="flex justify-between items-center animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-6 bg-white/10 rounded-full" />
                  <div className="w-16 h-6 bg-white/10 rounded-full" />
                  <div className="w-24 h-6 bg-white/10 rounded-full" />
                </div>
                
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-xl" />
                  <div className="w-10 h-10 bg-white/10 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Loading Indicator */}
      <div className="text-center py-16">
        <div className="relative inline-block group">
          {/* Spinning Ring */}
          <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6" />
          
          {/* Pulsing Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
          </div>
          
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white">LOADING CONFESSIONS</h3>
          <p className="text-zinc-400 font-mono text-sm tracking-wide">
            Gathering anonymous thoughts...
          </p>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-white rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .skeleton-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSkeletons;