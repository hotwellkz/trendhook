import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User, Settings, BarChart2, PlusCircle, AlertCircle } from 'lucide-react';
import { auth } from '../config/firebase';
import { ScriptGenerator } from './ScriptGenerator';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user, loading } = useAuth();
  const [showGenerator, setShowGenerator] = React.useState(false);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const handleUpgrade = () => {
    navigate('/billing');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const isTrialExpired = user?.subscription?.status === 'expired';
  const isInTrial = user?.subscription?.status === 'trial';
  const trialDaysLeft = isInTrial && user?.subscription?.trialEndsAt ? 
    Math.max(0, Math.ceil((user.subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 
    0;

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Навигация */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#AAFF00]" />
              <button 
                onClick={() => navigate('/')}
                className="text-xl font-bold hover:text-[#AAFF00] transition-colors"
              >
                ViralHooks
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}
