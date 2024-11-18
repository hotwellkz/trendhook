import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft, Search, Download, Plus, Trash2, Edit2, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from '../types/database';

interface SubscriberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => void;
  initialData?: Partial<User>;
  title: string;
}

function SubscriberModal({ isOpen, onClose, onSubmit, initialData, title }: SubscriberModalProps) {
  const [email, setEmail] = useState(initialData?.email || '');
  const [displayName, setDisplayName] = useState(initialData?.displayName || '');
  const [plan, setPlan] = useState(initialData?.subscription?.plan || 'free');
  const [status, setStatus] = useState(initialData?.subscription?.status || 'trial');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      email,
      displayName,
      subscription: {
        plan,
        status,
        tokensLeft: 10,
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date()
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Имя</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">План</label>
            <div className="relative">
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50 appearance-none"
              >
                <option value="free">Бесплатный</option>
                <option value="content-creator">Контент-мейкер</option>
                <option value="business">Бизнес</option>
                <option value="agency">Агентство</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Статус</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50 appearance-none"
              >
                <option value="trial">Пробный период</option>
                <option value="active">Активный</option>
                <option value="expired">Истёк</option>
                <option value="cancelled">Отменён</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#AAFF00] text-black font-medium hover:bg-[#88CC00]"
            >
              {initialData ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SubscribersPage() {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<User | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setSubscribers(users);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await deleteDoc(doc(db, 'users', id));
        setSubscribers(subscribers.filter(sub => sub.id !== id));
      } catch (error) {
        console.error('Error deleting subscriber:', error);
      }
    }
  };

  const handleAdd = async (data: Partial<User>) => {
    try {
      await addDoc(collection(db, 'users'), {
        ...data,
        createdAt: new Date()
      });
      fetchSubscribers();
    } catch (error) {
      console.error('Error adding subscriber:', error);
    }
  };

  const handleEdit = async (data: Partial<User>) => {
    if (!editingSubscriber?.id) return;
    try {
      await updateDoc(doc(db, 'users', editingSubscriber.id), data);
      fetchSubscribers();
    } catch (error) {
      console.error('Error updating subscriber:', error);
    }
  };

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Подписчики</h1>
          <div className="flex gap-4">
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

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по email или имени..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
            />
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 font-medium text-gray-400">Email</th>
                  <th className="text-left p-4 font-medium text-gray-400">Имя</th>
                  <th className="text-left p-4 font-medium text-gray-400">План</th>
                  <th className="text-left p-4 font-medium text-gray-400">Статус</th>
                  <th className="text-left p-4 font-medium text-gray-400">Токены</th>
                  <th className="text-right p-4 font-medium text-gray-400">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-gray-800 last:border-b-0">
                    <td className="p-4">{subscriber.email}</td>
                    <td className="p-4">{subscriber.displayName}</td>
                    <td className="p-4">{subscriber.subscription?.plan || 'free'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        subscriber.subscription?.status === 'active' ? 'bg-green-500/20 text-green-500' :
                        subscriber.subscription?.status === 'trial' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {subscriber.subscription?.status || 'expired'}
                      </span>
                    </td>
                    <td className="p-4">{subscriber.subscription?.tokensLeft || 0}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingSubscriber(subscriber)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(subscriber.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SubscriberModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAdd}
        title="Добавить подписчика"
      />

      <SubscriberModal
        isOpen={!!editingSubscriber}
        onClose={() => setEditingSubscriber(null)}
        onSubmit={handleEdit}
        initialData={editingSubscriber || undefined}
        title="Редактировать подписчика"
      />
    </div>
  );
}
