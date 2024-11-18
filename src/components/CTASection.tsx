import React, { useState } from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUser } from '../services/firestore';

export function CTASection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      navigate('/signup');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Генерируем случайный пароль для пользователя
      const tempPassword = Math.random().toString(36).slice(-12);
      
      // Создаем пользователя в Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword);
      
      // Создаем запись пользователя в Firestore
      await createUser(userCredential.user.uid, {
        email: userCredential.user.email!,
        displayName: null,
        photoURL: null
      });

      // Перенаправляем на дашборд
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        if (err.message.includes('email-already-in-use')) {
          setError('Этот email уже зарегистрирован. Пожалуйста, войдите в систему.');
        } else {
          setError('Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="bg-gray-800/30 rounded-[2rem] p-6 md:p-8 lg:p-12 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
          Готовы стать вирусным?
        </h2>
        <p className="text-gray-400 text-base md:text-lg lg:text-xl mb-6 md:mb-8 px-2 md:px-8 lg:px-12">
          Зарегистрируйтесь в ViralHooks и начните видеть результаты — без скрытых условий.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#AAFF00]" />
            <span className="text-gray-400 text-sm md:text-base">Без карты</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4 md:w-5 md:h-5 text-[#AAFF00]" />
            <span className="text-gray-400 text-sm md:text-base">7 дней бесплатно</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-[280px] sm:max-w-md mx-auto">
          <div className="bg-gray-800/50 p-2 rounded-lg flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="flex-1 bg-transparent px-4 py-2 outline-none rounded-lg text-sm md:text-base w-full sm:w-auto"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#AAFF00] text-black px-4 md:px-6 py-2 rounded-lg font-medium hover:bg-[#88CC00] transition-colors text-sm md:text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Подождите...</span>
                </>
              ) : (
                'Присоединиться'
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 text-red-500 text-sm flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
