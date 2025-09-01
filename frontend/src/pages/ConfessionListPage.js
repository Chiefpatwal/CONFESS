import React, { useState, useEffect } from "react";
import ConfessionCard from "../components/ConfessionCard";
import EmptyState from "../components/EmptyState";
import LoadingSkeletons from "../components/LoadingSkeletons";
import { getConfessions } from "../services/api.js";

const ConfessionListPage = ({ confessions: propConfessions, isLoading: propIsLoading, onUpdate, onDelete, onRefresh }) => {
  // Use local state for pagination and filtering, but props for confessions data
  const [localConfessions, setLocalConfessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  // Update local confessions when props change
  useEffect(() => {
    if (propConfessions && Array.isArray(propConfessions)) {
      setLocalConfessions(propConfessions);
      setTotalItems(propConfessions.length);
      setTotalPages(Math.ceil(propConfessions.length / limit));
    }
  }, [propConfessions, limit]);

  // Fetch confessions when page changes (for pagination)
  useEffect(() => {
    const fetchConfessionsData = async () => {
      setIsLoading(true);
      try {
        const data = await getConfessions(page, limit);
        
        // Normalize the response data
        let confessionsList = [];
        if (Array.isArray(data)) {
          confessionsList = data;
        } else if (data && Array.isArray(data.confessions)) {
          confessionsList = data.confessions;
          setTotalPages(data.totalPages || 1);
          setTotalItems(data.totalItems || confessionsList.length);
        } else if (data && Array.isArray(data.docs)) {
          confessionsList = data.docs;
          setTotalPages(data.totalPages || 1);
          setTotalItems(data.totalItems || confessionsList.length);
        }
        
        setLocalConfessions(confessionsList);
      } catch (err) {
        console.error("Error fetching confessions:", err);
        // Fallback to refresh function if available
        if (onRefresh) {
          onRefresh();
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfessionsData();
    setIsVisible(true);
  }, [page, limit, onRefresh]);

  // Apply filtering to current confessions
  const getFilteredConfessions = () => {
    let filtered = [...localConfessions];
    
    switch (filter) {
      case "recent":
        // Sort by creation date (most recent first)
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "popular":
        // For now, just return as is. You can add a popularity field later
        return filtered;
      case "all":
      default:
        return filtered;
    }
  };

  const filteredConfessions = getFilteredConfessions();

  // Handle page navigation
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page when filter changes
  };

  // Wrap the original functions to update local state immediately
  const handleUpdateLocal = async (id, text) => {
    try {
      await onUpdate(id, text);
      
      // Update local state immediately for instant feedback
      setLocalConfessions(prev => 
        prev.map(confession => 
          confession._id === id 
            ? { ...confession, text: text, updatedAt: new Date().toISOString() }
            : confession
        )
      );
    } catch (err) {
      // If update fails, revert local state by refetching
      if (onRefresh) {
        onRefresh();
      }
      throw err;
    }
  };

  const handleDeleteLocal = async (id) => {
    try {
      await onDelete(id);
      
      // Update local state immediately for instant feedback
      setLocalConfessions(prev => prev.filter(confession => confession._id !== id));
      setTotalItems(prev => prev - 1);
      
      // Check if we need to go to previous page
      if (filteredConfessions.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      }
    } catch (err) {
      // If delete fails, revert local state by refetching
      if (onRefresh) {
        onRefresh();
      }
      throw err;
    }
  };

  if ((isLoading || propIsLoading) && localConfessions.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <LoadingSkeletons />
        </div>
      </div>
    );
  }

  if (filteredConfessions.length === 0 && !isLoading && !propIsLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        {/* Header Section */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mt-6 mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white via-zinc-300 to-white bg-clip-text text-transparent">
                STORIES SO FAR             
              </span>
            </h1>
          </div>

          {/* Stats & Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Stats Card */}
            <div className="group relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {totalItems}
                    </div>
                    <div className="text-sm text-zinc-400 font-mono">
                      TOTAL COUNT
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {["all", "recent"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => handleFilterChange(filterType)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
                    filter === filterType
                      ? "bg-white text-black border-white shadow-lg shadow-white/20"
                      : "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30"
                  }`}
                >
                  {filterType.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Confessions Grid */}
        <div className="grid gap-8 lg:gap-10">
          {filteredConfessions.map((confession, index) => (
            <div
              key={confession._id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <ConfessionCard
                confession={confession}
                onUpdate={handleUpdateLocal}
                onDelete={handleDeleteLocal}
                index={index}
                page={page}
                limit={limit}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-6 py-3 rounded-xl font-medium bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {/* First page */}
                {page > 3 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="w-10 h-10 rounded-lg font-medium bg-white/5 text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      1
                    </button>
                    {page > 4 && <span className="text-zinc-400 px-2">...</span>}
                  </>
                )}

                {/* Page range around current page */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  if (pageNum < 1 || pageNum > totalPages) return null;
                  if (page > 3 && pageNum === 1) return null;
                  if (page < totalPages - 2 && pageNum === totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                        page === pageNum
                          ? "bg-white text-black border border-white shadow-lg"
                          : "bg-white/5 text-white border border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Last page */}
                {page < totalPages - 2 && (
                  <>
                    {page < totalPages - 3 && <span className="text-zinc-400 px-2">...</span>}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="w-10 h-10 rounded-lg font-medium bg-white/5 text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-6 py-3 rounded-xl font-medium bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Page Info */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-sm font-mono text-zinc-400">
              Page {page} of {totalPages}
            </span>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-sm font-mono text-zinc-400">
              Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, totalItems)} of {totalItems}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfessionListPage;