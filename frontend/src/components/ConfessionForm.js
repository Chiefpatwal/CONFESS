import React, { useState, useEffect } from 'react';

const ConfessionForm = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  useEffect(() => {
    setCharCount(text.length);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && text.length >= 5) {
      onSubmit(text.trim());
      setText('');
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const progressPercentage = (charCount / maxChars) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="group relative">
        {/* Glow Effect */}
        <div className={`absolute -inset-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-2xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-50'}`} />
        
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-white/5 to-white/5 p-8 border-b border-white/5">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
               
                <h2 className="text-2xl font-bold text-white tracking-wide"></h2>
               
              </div>
              
             
            </div>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Textarea Container */}
              <div className="relative">
                <div className={`absolute -inset-2 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-lg transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
                
                <div className="relative">
                  <textarea
                    className={`w-full h-48 p-6 bg-black/30 backdrop-blur-sm border-2 rounded-2xl text-white placeholder-zinc-500 resize-none focus:outline-none transition-all duration-300 ${
                      isFocused 
                        ? 'border-white/50 bg-black/50 shadow-2xl' 
                        : 'border-white/20 bg-black/20'
                    }`}
                    placeholder="What's weighing on your mind? Share your thoughts anonymously..."
                    value={text}
                    onChange={handleTextChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    maxLength={maxChars}
                    disabled={isLoading}
                  />
                  
                  {/* Character Counter Overlay */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full backdrop-blur-sm text-xs font-mono transition-colors duration-300 ${
                      charCount > maxChars * 0.9 
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                        : charCount > maxChars * 0.7 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-white/10 text-zinc-300 border border-white/20'
                    }`}>
                      {charCount}/{maxChars}
                    </div>
                    
                    <div className={`px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm text-xs font-mono text-zinc-300 border border-white/20 ${
                      wordCount > 0 ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-300`}>
                      {wordCount} words
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 rounded-full ${
                        progressPercentage > 90 
                          ? 'bg-gradient-to-r from-red-500 to-red-400' 
                          : progressPercentage > 70 
                          ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                          : 'bg-gradient-to-r from-green-500 to-green-400'
                      }`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Validation Message */}
                {text.length > 0 && text.length < 5 && (
                  <div className="mt-3 flex items-center gap-2 text-amber-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-sm font-medium">Minimum 5 characters required</span>
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading || !text.trim() || text.length < 5}
                  className="group relative inline-flex items-center gap-3 px-12 py-4 bg-white text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-2xl overflow-hidden"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        SUBMITTING CONFESSION...
                      </>
                    ) : (
                      <>
                       
                        CONFESS
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>

            Guidelines
            <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                COMMUNITY GUIDELINES
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-400">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full mt-2 flex-shrink-0" />
                  <span>Be respectful and kind to others</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full mt-2 flex-shrink-0" />
                  <span>No personal attacks or harassment</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full mt-2 flex-shrink-0" />
                  <span>Keep content appropriate for all ages</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-white/40 rounded-full mt-2 flex-shrink-0" />
                  <span>Your identity remains completely anonymous</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfessionForm;