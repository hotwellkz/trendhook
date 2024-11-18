import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft, Search, Download, Plus, Trash2, Edit2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy, deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, SubscriptionPlan, SubscriptionStatus } from '../types/database';

interface SubscriberData extends User {
  lastActive?: Date;
  totalTokensUsed?: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<SubscriberData>) => void;
  initialData?: Partial<SubscriberData>;
  title: string;
}

function Modal({ isOpen, onClose, onSubmit, initialData, title }: ModalProps) {
  const [email, setEmail] = useState(initialData?.email || '');
  const [displayName, setDisplayName] = useState(initialData?.displayName || '');
  const [plan, setPlan] = useState<SubscriptionPlan>(initialData?.subscription?.plan || 'free');
  const [status, setStatus] = useState<SubscriptionStatus>(initialData?.subscription?.status || 'trial');
  const [tokens, setTokens] = useState(initialData?.subscription?.tokensLeft?.toString() || '10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      email,
      displayName,
      subscription: {
        plan,
        status,
        tokensLeft: parseInt(tokens),
        trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        lastUpdated: new Date()
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Имя</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-gray-900 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">План</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as SubscriptionPlan)}
              className="w-full bg-gray-900 rounded-lg px-4 py-2 text-white"
            >
              <option value="free">Бесплатный</option>
              <option value="content-creator">Контент-мейкер</option>
              <option value="business">Бизнес</option>
              <option value="agency">Агентство</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Статус</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as SubscriptionStatus)}
              className="w-full bg-gray-900 rounded-lg px-4 py-2 text-white"
            >
              <option value="trial">Пробный период</option>
              <option value="active">Активный</option>
              <option value="expired">Истёк</option>
              <option value="cancelled">Отменён</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Токены</label>
            <input
              type="number"
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
              className="w-full bg-gray-900 rounded-lg px-4 py-2 text-white"
              min="0"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#AAFF00] text-black rounded-lg hover:bg-[#88CC00] transition-colors font-medium"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SubscribersPage() {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<SubscriberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<Partial<SubscriberData> | undefined>();

  const fetchSubscribers = async () => {
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const subscribersData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate(),
        subscription: {
          ...doc.data().subscription,
          trialEndsAt: doc.data().subscription?.trialEndsAt?.toDate(),
          expiresAt: doc.data().subscription?.expiresAt?.toDate(),
          lastUpdated: doc.data().subscription?.lastUpdated?.toDate()
        }
      })) as SubscriberData[];
      setSubscribers(subscribersData);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDeleteSubscriber = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', id));
      await fetchSubscribers();
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      alert('Ошибка при удалении пользователя');
    }
  };

  const handleAddOrUpdateSubscriber = async (data: Partial<SubscriberData>) => {
    try {
      const userId = editingSubscriber?.id || Math.random().toString(36).substr(2, 9);
      const userRef = doc(db, 'users', userId);
      
      const userData = {
        ...data,
        id: userId,
        createdAt: editingSubscriber?.createdAt || Timestamp.fromDate(new Date()),
        subscription: {
          ...data.subscription,
          trialEndsAt: Timestamp.fromDate(data.subscription!.trialEndsAt!),
          expiresAt: Timestamp.fromDate(data.subscription!.expiresAt!),
          lastUpdated: Timestamp.fromDate(data.subscription!.lastUpdated!)
        }
      };

      await setDoc(userRef, userData);
      await fetchSubscribers();
      setIsModalOpen(false);
      setEditingSubscriber(undefined);
    } catch (error) {
      console.error('Error adding/updating subscriber:', error);
      alert('Ошибка при сохранении пользователя');
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.displayName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (filter) {
      case 'active':
        return subscriber.subscription?.status === 'active';
      case 'trial':
        return subscriber.subscription?.status === 'trial';
      case 'expired':
        return subscriber.subscription?.status === 'expired';
      default:
        return true;
    }
  });

  const handleExportCSV = () => {
    const headers = ['Email', 'Name', 'Plan', 'Status', 'Tokens Left', 'Created At'];
    const csvData = filteredSubscribers.map(sub => [
      sub.email,
      sub.displayName || 'N/A',
      sub.subscription?.plan || 'N/A',
      sub.subscription?.status || 'N/A',
      sub.subscription?.tokensLeft || '0',
      sub.createdAt?.toLocaleDateString() || 'N/A'
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#AAFF00]" />
              <span className="text-xl font-bold text-white">ViralHooks</span>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Подписчики</h1>
          <p className="text-gray-400">Управление и мониторинг подписчиков</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по email или имени..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            >
              <option value="all">Все</option>
              <option value="active">Активные</option>
              <option value="trial">Пробный период</option>
              <option value="expired">Истёк</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-gray-800/30 text-white px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Экспорт</span>
            </button>

            <button
              onClick={() => {
                setEditingSubscriber(undefined);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-[#AAFF00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#88CC00] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Добавить</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Пользователь
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    План
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Токены
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Дата регистрации
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                      Загрузка...
                    </td>
                  </tr>
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                      Подписчики не найдены
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-800/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {subscriber.photoURL ? (
                            <img
                              src={subscriber.photoURL}
                              alt=""
                              className="w-8 h-8 rounded-full mr-3"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-700 mr-3 flex items-center justify-center">
                              <span className="text-sm font-medium">
                                {subscriber.displayName?.[0] || subscriber.email?.[0] || '?'}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{subscriber.displayName}</div>
                            <div className="text-sm text-gray-400">{subscriber.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize">{subscriber.subscription?.plan || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subscriber.subscription?.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : subscriber.subscription?.status === 'trial'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subscriber.subscription?.status || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {subscriber.subscription?.tokensLeft || 0}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {subscriber.createdAt?.toLocaleDateString() || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingSubscriber(subscriber);
                            setIsModalOpen(true);
                          }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSubscriber(undefined);
        }}
        onSubmit={handleAddOrUpdateSubscriber}
        initialData={editingSubscriber}
        title={editingSubscriber ? 'Редактировать пользователя' : 'Добавить пользователя'}
      />
    </div>
  );
}
