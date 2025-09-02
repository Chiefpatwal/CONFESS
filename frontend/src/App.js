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

  useEffect(() => {
    fetchConfessions();
  }, []);

  const fetchConfessions = async () => {
    try {
      setLoading(true);
      const data = await confessionService.getAll();
      
      if (Array.isArray(data)) {
        setConfessions(data);
      } else if (data && Array.isArray(data.confessions)) {
        setConfessions(data.confessions);
      } else {
        setConfessions([]);
      }
      
      setError('');
    } catch (err) {
      setError('Failed to load confessions');
      setConfessions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateConfession = async (text) => {
    try {
      setIsSubmitting(true);
      const token = await getToken();
      const newConfession = await confessionService.create(text, token);

      setConfessions((prev) => {
        const currentConfessions = Array.isArray(prev) ? prev : [];
        return [newConfession, ...currentConfessions];
      });

      setError('');
      showToast('Confession shared successfully!', 'success');
      setCurrentPage('list');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post confession');
      showToast('Failed to share confession', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      setError(err.response?.data?.message || 'Failed to update confession');
      showToast('Failed to update confession', 'error');
      throw err;
    }
  };

  const handleDeleteConfession = async (id) => {
    try {
      const token = await getToken();
      await confessionService.delete(id, token);
      
      setConfessions(prev => {
        const currentConfessions = Array.isArray(prev) ? prev : [];
        return currentConfessions.filter(confession => confession._id !== id);
      });
      
      setError('');
      showToast('Confession deleted successfully!', 'success');
    } catch (err) {
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