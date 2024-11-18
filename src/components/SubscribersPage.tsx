// Обновляем импорты, добавляя getDocs и collection
import React, { useState, useEffect } from 'react';
import { Activity, ArrowLeft, Search, Plus, Download, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User } from '../types/database';

// ... остальной код до SubscribersPage остается без изменений ...

export default function SubscribersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscribers, setSubscribers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Загрузка подписчиков
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
    subscriber.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = async (data: Partial<User>) => {
    // Реализация добавления подписчика будет добавлена позже
    console.log('Adding subscriber:', data);
  };

  const handleEdit = async (data: Partial<User>) => {
    // Реализация редактирования подписчика будет добавлена позже
    console.log('Editing subscriber:', data);
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

  return (
    <div className="min-h-screen bg-black">
      {/* Навигация остается без изменений */}
      <nav className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        {/* ... код навигации ... */}
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ... остальной код до таблицы ... */}

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
                {/* ... остальной код таблицы ... */}
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Модальные окна остаются без изменений */}
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
