import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft, Search, Plus, Download, Edit2, Trash2, Loader2, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, deleteDoc, collection, getDocs, updateDoc, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, SubscriptionPlan } from '../types/database';

const PLANS: { [key in SubscriptionPlan]: { title: string, tokens: number } } = {
  'free': { title: 'Бесплатный', tokens: 10 },
  'content-creator': { title: 'Контент-мейкер', tokens: 60 },
  'business': { title: 'Бизнес', tokens: 250 },
  'agency': { title: 'Агентство', tokens: 999999 } // Безлимит
};

interface PlanSelectorProps {
  currentPlan: SubscriptionPlan;
  onPlanChange: (plan: SubscriptionPlan) => void;
  disabled?: boolean;
}

function PlanSelector({ currentPlan, onPlanChange, disabled }: PlanSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="w-full bg-black/40 rounded-lg px-3 py-2 text-left text-sm flex items-center justify-between gap-2 disabled:opacity-50"
        disabled={disabled}
      >
        <span className={`${getPlanColor(currentPlan)}`}>
          {PLANS[currentPlan]?.title || 'Бесплатный'}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800">
          {Object.entries(PLANS).map(([plan, { title }]) => (
            <button
              key={plan}
              type="button"
              onClick={() => {
                onPlanChange(plan as SubscriptionPlan);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-[#AAFF00]/10 transition-colors ${
                plan === currentPlan ? 'bg-[#AAFF00]/5 text-[#AAFF00]' : ''
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function getPlanColor(plan: SubscriptionPlan): string {
  switch (plan) {
    case 'agency':
      return 'text-purple-400';
    case 'business':
      return 'text-blue-400';
    case 'content-creator':
      return 'text-green-400';
    default:
      return 'text-gray-400';
  }
}

interface SubscriberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<User>) => Promise<void>;
  initialData?: User;
  title: string;
}

function SubscriberModal({ isOpen, onClose, onSubmit, initialData, title }: SubscriberModalProps) {
  const [email, setEmail] = useState(initialData?.email || '');
  const [displayName, setDisplayName] = useState(initialData?.displayName || '');
  const [paypalEmail, setPaypalEmail] = useState(initialData?.paypalEmail || '');
  const [plan, setPlan] = useState<SubscriptionPlan>(initialData?.subscription?.plan || 'free');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setEmail(initialData.email);
      setDisplayName(initialData.displayName || '');
      setPaypalEmail(initialData.paypalEmail || '');
      setPlan(initialData.subscription?.plan || 'free');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const now = new Date();
      const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      await onSubmit({
        email,
        displayName,
        paypalEmail,
        subscription: {
          plan,
          tokensLeft: PLANS[plan].tokens,
          status: 'active',
          trialEndsAt,
          expiresAt: trialEndsAt,
          lastUpdated: now
        }
      });
      onClose();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Произошла ошибка при сохранении');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
              required
              disabled={loading || !!initialData}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Имя пользователя
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              PayPal Email
            </label>
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="w-full bg-black/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
              placeholder="Email для выплат PayPal"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Тарифный план
            </label>
            <PlanSelector
              currentPlan={plan}
              onPlanChange={setPlan}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-[#AAFF00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Сохранение...</span>
                </>
              ) : (
                'Сохранить'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SubscribersPage() {
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

  const filteredSubscribers = subscribers.filter(subscriber => 
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.paypalEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = async (data: Partial<User>) => {
    try {
      const usersRef = collection(db, 'users');
      const now = new Date();
      const trialEndsAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const newUser: Partial<User> = {
        ...data,
        createdAt: now,
        subscription: {
          plan: data.subscription?.plan || 'free',
          tokensLeft: PLANS[data.subscription?.plan || 'free'].tokens,
          status: 'active',
          trialEndsAt,
          expiresAt: trialEndsAt,
          lastUpdated: now
        }
      };

      const docRef = await addDoc(usersRef, {
        ...newUser,
        createdAt: Timestamp.fromDate(now),
        subscription: {
          ...newUser.subscription,
          trialEndsAt: Timestamp.fromDate(trialEndsAt),
          expiresAt: Timestamp.fromDate(trialEndsAt),
          lastUpdated: Timestamp.fromDate(now)
        }
      });
      
      setSubscribers(prev => [...prev, { id: docRef.id, ...newUser } as User]);
    } catch (err) {
      console.error('Error adding subscriber:', err);
      throw new Error('Ошибка при добавлении подписчика');
    }
  };

  const handleEdit = async (data: Partial<User>) => {
    if (!editingSubscriber?.id) return;

    try {
      const userRef = doc(db, 'users', editingSubscriber.id);
      const now = new Date();
      
      await updateDoc(userRef, {
        ...data,
        updatedAt: Timestamp.fromDate(now),
        subscription: {
          ...data.subscription,
          lastUpdated: Timestamp.fromDate(now)
        }
      });

      setSubscribers(prev => 
        prev.map(sub => 
          sub.id === editingSubscriber.id 
            ? { ...sub, ...data }
            : sub
        )
      );
    } catch (err) {
      console.error('Error editing subscriber:', err);
      throw new Error('Ошибка при редактировании подписчика');
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

  const handleQuickPlanChange = async (subscriberId: string, newPlan: SubscriptionPlan) => {
    try {
      const userRef = doc(db, 'users', subscriberId);
      const now = new Date();
      
      await updateDoc(userRef, {
        'subscription.plan': newPlan,
        'subscription.tokensLeft': PLANS[newPlan].tokens,
        'subscription.lastUpdated': Timestamp.fromDate(now)
      });

      setSubscribers(prev => 
        prev.map(sub => 
          sub.id === subscriberId 
            ? {
                ...sub,
                subscription: {
                  ...sub.subscription,
                  plan: newPlan,
                  tokensLeft: PLANS[newPlan].tokens,
                  lastUpdated: now
                }
              }
            : sub
        )
      );
    } catch (err) {
      console.error('Error changing plan:', err);
      alert('Ошибка при изменении тарифного плана');
    }
  };

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
