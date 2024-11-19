import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { 
  doc, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  updateDoc,
  increment,
  where,
  getDocs,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Timestamp | Date;
}

export function ChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return undefined;

    const initChat = async () => {
      try {
        // Ищем существующий чат пользователя
        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, where('userId', '==', user.id));
        const querySnapshot = await getDocs(q);
        
        let existingChatId: string | null = null;
        
        if (!querySnapshot.empty) {
          existingChatId = querySnapshot.docs[0].id;
        } else {
          // Создаем новый чат если не нашли существующий
          const newChatRef = await addDoc(chatsRef, {
            userId: user.id,
            userEmail: user.email,
            createdAt: serverTimestamp(),
            lastMessage: null,
            unreadCount: 0
          });
          existingChatId = newChatRef.id;
        }
        
        setChatId(existingChatId);

        // Подписываемся на сообщения
        const messagesRef = collection(db, 'chats', existingChatId, 'messages');
        const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
        
        return onSnapshot(messagesQuery, (snapshot) => {
          const newMessages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date()
          })) as Message[];
          setMessages(newMessages);
          scrollToBottom();
        });
      } catch (error) {
        console.error('Error initializing chat:', error);
        return () => {};
      }
    };

    const unsubscribePromise = initChat();
    
    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) {
          unsubscribe();
        }
      });
    };
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !chatId || !user) return;

    setLoading(true);
    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, {
        text: message,
        sender: 'user',
        timestamp: serverTimestamp()
      });

      // Обновляем информацию о последнем сообщении
      const chatRef = doc(db, 'chats', chatId);
      await updateDoc(chatRef, {
        lastMessage: message,
        lastMessageTime: serverTimestamp(),
        unreadCount: increment(1)
      });

      // Отправляем уведомление в Telegram
      await fetch('/.netlify/functions/telegram-notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          message,
          userEmail: user.email
        }),
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-black border border-gray-800 rounded-lg shadow-lg w-80 md:w-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h3 className="font-medium">Чат поддержки</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                Напишите нам, мы онлайн 👋
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-[#AAFF00] text-black'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {msg.timestamp instanceof Date ? msg.timestamp.toLocaleTimeString() : 'Сейчас'}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 bg-gray-800/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !message.trim()}
                className="bg-[#AAFF00] text-black p-2 rounded-lg hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#AAFF00] text-black p-3 rounded-full hover:bg-[#88CC00] transition-colors shadow-lg"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
