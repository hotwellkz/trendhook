import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft, Search, Plus, Download, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { updateUserPlan } from '../services/firestore';
import type { User, SubscriptionPlan } from '../types/database';
import { PasswordProtection } from './Subscribers/PasswordProtection';
import { SubscribersList } from './Subscribers/SubscribersList';

export default function SubscribersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscribers, setSubscribers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSubscribers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const loadedSubscribers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          subscription: {
            ...doc.data().subscription,
            trialEndsAt: doc.data().subscription?.trialEndsAt?.toDate(),
            expiresAt: doc.data().subscription?.expiresAt?.toDate(),
            lastUpdated: doc.data().subscription?.lastUpdated?.toDate()
          }
        })) as User[];
        setSubscribers(loadedSubscribers);
      } catch (err) {
        console.error('Error loading subscribers:', err);
        setError('Ошибка при загрузке подписчиков');
      } finally {
        setLoading(false);
      }
    };

    loadSubscribers();
  }, []);

  const handleQuickPlanChange = async (userId: string, plan: SubscriptionPlan) => {
    try {
      await updateUserPlan(userId, plan);
      
      setSubscribers(prev => 
        prev.map(sub => 
          sub.id === userId 
            ? { 
                ...sub, 
                subscription: { 
                  ...sub.subscription, 
                  plan,
                  status: plan === 'free' ? 'expired' : 'active',
                  expiresAt: new Date(Date.now() + (plan === 'free' ? 0 : 30 * 24 * 60 * 60 * 1000))
                } 
              }
            : sub
        )
      );
    } catch (err) {
      console.error('Error updating plan:', err);
      alert('Ошибка при обновлении плана');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого подписчика?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', id));
      setSubscribers(prev => prev.filter(sub => sub.id !== id));
    } catch (err) {
      console.error('Error deleting subscriber:', err);
      alert('Ошибка при удалении подписчика');
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => 
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.paypalEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
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
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Назад</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Подписчики</h1>
            <p className="text-gray-400">Управление подписчиками и их подписками</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-[#AAFF00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#88CC00] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Добавить</span>
            </button>
            <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-5 h-5" />
              <span>Экспорт</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по email, имени или PayPal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            />
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-8 h-8 text-[#AAFF00] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 p-8 text-center">
              {error}
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-gray-400 p-8 text-center">
              {searchTerm ? 'Подписчики не найдены' : 'Нет подписчиков'}
            </div>
          ) : (
            <SubscribersList
              subscribers={filteredSubscribers}
              onPlanChange={handleQuickPlanChange}
              onDelete={handleDelete}
              onEdit={setEditingSubscriber}
            />
          )}
        </div>
      </div>
    </div>
  );
}
