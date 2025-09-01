import React, { useState, useRef, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import DeleteModal from './DeleteModal'; // Add this import

const ConfessionCard = ({ confession, onUpdate, onDelete, index = 0, page = 1, limit = 5 }) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(confession.text);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Add modal state
  const [isDeleting, setIsDeleting] = useState(false); // Separate loading state for delete
  const cardRef = useRef(null);

  const isOwner = isSignedIn && user?.id === confession.userId;
  const isEdited = confession.updatedAt !== confession.createdAt;

  useEffect(() => {
    if (isEditing && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isEditing]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSave = async () => {
    if (!editText.trim()) return;
    
    setIsLoading(true);
    try {
      await onUpdate(confession._id, editText.trim());
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(confession.text);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(confession._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  // Calculate correct card number
  const cardNumber = (page - 1) * limit + index + 1;

  return (
    <>
      <div 
        ref={cardRef}
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Glow */}
        <div className={`absolute -inset-4 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/30 transition-all duration-500">
          {/* Card Number */}
          <div className="absolute top-4 left-4 z-10">
            <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
              <span className="text-xs font-mono text-white font-bold">
                #{String(cardNumber).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="p-8 pt-16">
            {isEditing ? (
              <div className="space-y-6">
                {/* Edit Mode */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-lg" />
                  <textarea
                    className="relative w-full min-h-40 p-6 bg-black/30 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-zinc-400 resize-none focus:outline-none focus:border-white/50 focus:bg-black/50 transition-all duration-300"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Edit your confession..."
                    disabled={isLoading}
                    maxLength={500}
                    autoFocus
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm font-mono text-zinc-400">
                    {editText.length}/500 characters
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      disabled={isLoading}
                      className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading || !editText.trim() || editText.length < 5}
                      className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isLoading && (
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      )}
                      {isLoading ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Confession Text */}
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-white/90 font-light">
                    "{confession.text}"
                  </p>
                </div>
                
                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                
                {/* Footer */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* Date Badge */}
                    <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                      <span className="text-xs font-mono text-zinc-300">
                        {formatDate(confession.createdAt)}
                      </span>
                    </div>
                    
                    {/* Edited Badge */}
                    {isEdited && (
                      <div className="px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30">
                        <span className="text-xs font-mono text-amber-300">
                          EDITED
                        </span>
                      </div>
                    )}
                    
                    {/* Anonymous Badge */}
                    <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                      <span className="text-xs font-mono text-green-300">
                        ANONYMOUS
                      </span>
                    </div>
                  </div>

                  {/* Owner Actions */}
                  {isOwner && (
                    <div className={`flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-60 scale-95'}`}>
                      <button
                        onClick={() => setIsEditing(true)}
                        disabled={isLoading || isDeleting}
                        className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl transition-all duration-300 flex items-center justify-center group/btn"
                        title="Edit confession"
                      >
                        <svg className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={handleDeleteClick}
                        disabled={isLoading || isDeleting}
                        className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl transition-all duration-300 flex items-center justify-center group/btn"
                        title="Delete confession"
                      >
                        <svg className="w-4 h-4 text-red-300 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Hover Effect Border */}
          <div className={`absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : ''}`} style={{ padding: '1px' }}>
            <div className="w-full h-full bg-transparent rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ConfessionCard;