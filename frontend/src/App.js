import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import Header from './components/Header';
import ConfessionListPage from './pages/ConfessionListPage';
import CreateConfessionPage from './pages/CreateConfessionPage';
import ErrorAlert from './components/ErrorAlert';
import Footer from './components/Footer';
import { confessionService } from './services/confessionService';
import { showToast } from './utils/toast';
import './styles/animations.css';
import HomePage from './pages/HomePage';

function App() {
  const { getToken } = useAuth();
  const [currentPage, setCurrentPage] = useState('list');
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch confessions on component mount
  useEffect(() => {
    fetchConfessions();
  }, []);

  // Fetch all confessions
  const fetchConfessions = async () => {
    try {
      setLoading(true);
      const data = await confessionService.getAll();
      
      // Normalize the data structure - ensure we always work with an array
      if (Array.isArray(data)) {
        setConfessions(data);
      } else if (data && Array.isArray(data.confessions)) {
        setConfessions(data.confessions);
      } else if (data && Array.isArray(data.docs)) {
        setConfessions(data.docs);
      } else {
        console.warn('Unexpected data structure:', data);
        setConfessions([]);
      }
      
      setError('');
    } catch (err) {
      console.error('Failed to fetch confessions:', err);
      setError('Failed to load confessions');
      setConfessions([]); // Ensure we have an array even on error
    } finally {
      setLoading(false);
    }
  };

  // Create new confession
  const handleCreateConfession = async (text) => {
    try {
      setIsSubmitting(true);
      const token = await getToken();
      const newConfession = await confessionService.create(text, token);

      // Add the new confession to the beginning of the array
      setConfessions((prev) => {
        // Ensure prev is always an array
        const currentConfessions = Array.isArray(prev) ? prev : [];
        return [newConfession, ...currentConfessions];
      });

      setError('');
      showToast('Confession shared successfully!', 'success');
      setCurrentPage('list');
    } catch (err) {
      console.error('Failed to post confession:', err);
      setError(err.response?.data?.message || 'Failed to post confession');
      showToast('Failed to share confession', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update confession
  const handleUpdateConfession = async (id, text) => {
    try {
      const token = await getToken();
      const updatedConfession = await confessionService.update(id, text, token);
      
      setConfessions(prev => {
        const currentConfessions = Array.isArray(prev) ? prev : [];
        return currentConfessions.map(confession => 
          confession._id === id ? updatedConfession : confession
        );
      });

      setError('');
      showToast('Confession updated successfully!', 'success');
    } catch (err) {
      console.error('Failed to update confession:', err);
      setError(err.response?.data?.message || 'Failed to update confession');
      showToast('Failed to update confession', 'error');
      throw err;
    }
  };

  // Delete confession
  const handleDeleteConfession = async (id) => {
    try {
      const token = await getToken();
      await confessionService.delete(id, token);
      
      // Remove the confession from the array
      setConfessions(prev => {
        // Ensure prev is always an array
        const currentConfessions = Array.isArray(prev) ? prev : [];
        return currentConfessions.filter(confession => confession._id !== id);
      });
      
      setError('');
      showToast('Confession deleted successfully!', 'success');
    } catch (err) {
      console.error('Failed to delete confession:', err);
      setError(err.response?.data?.message || 'Failed to delete confession');
      showToast('Failed to delete confession', 'error');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Header 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <main>
        {currentPage === 'home' && (
          <HomePage 
            onPageChange={setCurrentPage}
            confessionCount={confessions.length}
          />
        )}
        {currentPage === 'list' && (
          <ConfessionListPage 
            confessions={confessions}
            isLoading={loading}
            onUpdate={handleUpdateConfession}
            onDelete={handleDeleteConfession}
            onRefresh={fetchConfessions}
          />
        )}
        
        {currentPage === 'create' && (
          <CreateConfessionPage 
            onSubmit={handleCreateConfession}
            isLoading={isSubmitting}
          />
        )}
      </main>
      
      <Footer />
      
      {error && (
        <ErrorAlert 
          message={error} 
          onClose={() => setError('')} 
        />
      )}
    </div>
  );
}

export default App;