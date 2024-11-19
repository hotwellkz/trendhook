import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft, Search, Plus, Download, Edit2, Trash2, Loader2, X, ChevronDown, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, deleteDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, Payment, SubscriptionPlan } from '../types/database';

function PaymentHistory({ payments, totalPaid }: { payments?: Payment[], totalPaid?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!payments?.length) return null;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-[#AAFF00] hover:underline flex items-center gap-1"
      >
        Всего оплачено: ${totalPaid?.toFixed(2) || '0.00'}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute mt-2 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 p-4 z-20 min-w-[200px]">
          <h4 className="text-sm font-medium mb-2">История платежей:</h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className={`text-xs ${
                  payment.status === 'refunded' ? 'text-red-400' : 'text-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{new Date(payment.date).toLocaleDateString()}</span>
                  <span className={payment.status === 'refunded' ? 'text-red-400' : 'text-[#AAFF00]'}>
                    {payment.status === 'refunded' ? '-' : ''}${Math.abs(payment.amount).toFixed(2)}
                  </span>
                </div>
                <div className="text-gray-500">{payment.plan}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PlanSelector({ currentPlan, onPlanChange }: { currentPlan: SubscriptionPlan, onPlanChange: (plan: SubscriptionPlan) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const plans: SubscriptionPlan[] = ['free', 'content-creator', 'business', 'agency'];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm hover:text-[#AAFF00] transition-colors"
      >
        {currentPlan}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute mt-1 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 py-1 z-10">
          {plans.map((plan) => (
            <button
              key={plan}
              onClick={() => {
                onPlanChange(plan);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-[#AAFF00]/10 transition-colors ${
                plan === currentPlan ? 'text-[#AAFF00]' : 'text-gray-400'
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PasswordProtection({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'fghRTht3@') {
      onSuccess();
    } else {
      setError('Неверный пароль');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Lock className="w-8 h-8 text-[#AAFF00]" />
          <h1 className="text-2xl font-bold">Доступ к подписчикам</h1>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Пароль для доступа
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 rounded-lg pl-4 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
                  placeholder="Введите пароль"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#AAFF00] text-black py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

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
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        'subscription.plan': plan,
        'subscription.updatedAt': new Date()
      });
      
      setSubscribers(prev => 
        prev.map(sub => 
          sub.id === userId 
            ? { ...sub, subscription: { ...sub.subscription, plan } }
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/20">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Имя</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">PayPal Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">План</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Статус</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Токены</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Платежи</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-black/20">
                      <td className="px-4 py-3 text-sm">{subscriber.email}</td>
                      <td className="px-4 py-3 text-sm">{subscriber.displayName}</td>
                      <td className="px-4 py-3 text-sm">{subscriber.paypalEmail || '-'}</td>
                      <td className="px-4 py-3 text-sm">
                        <PlanSelector
                          currentPlan={subscriber.subscription.plan}
                          onPlanChange={(plan) => handleQuickPlanChange(subscriber.id, plan)}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          subscriber.subscription.status === 'active'
                            ? 'bg-green-500/10 text-green-500'
                            : subscriber.subscription.status === 'trial'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {subscriber.subscription.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{subscriber.subscription.tokensLeft}</td>
                      <td className="px-4 py-3 text-sm relative">
                        <PaymentHistory 
                          payments={subscriber.payments}
                          totalPaid={subscriber.totalPaid}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        <button
                          onClick={() => setEditingSubscriber(subscriber)}
                          className="text-gray-400 hover:text-white transition-colors p-1"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(subscriber.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
