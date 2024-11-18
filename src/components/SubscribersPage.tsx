import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft, Search, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from '../types/database';

interface SubscriberData extends User {
  lastActive?: Date;
  totalTokensUsed?: number;
}

export function SubscribersPage() {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<SubscriberData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, trial, expired

  useEffect(() => {
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

    fetchSubscribers();
  }, []);

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
      {/* Навигация */}
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

        {/* Фильтры и поиск */}
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
              className="flex items-center gap-2 bg-[#AAFF00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#88CC00] transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Экспорт</span>
            </button>
          </div>
        </div>

        {/* Таблица подписчиков */}
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                      Загрузка...
                    </td>
                  </tr>
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
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
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
