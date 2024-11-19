import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { createUser } from '../services/firestore';

export function HeroSection() {
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
      const tempPassword = Math.random().toString(36).slice(-12);
      const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword);
      
      await createUser(userCredential.user.uid, {
        email: userCredential.user.email!,
        displayName: null,
        photoURL: null
      });

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 md:space-y-8"
      >
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => navigate('/signup')}
            className="inline-block bg-gray-800/50 rounded-full px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-800/70 transition-colors"
          >
            <span className="text-[#AAFF00] text-sm md:text-base whitespace-normal md:whitespace-nowrap px-1">
              Попробуйте профессиональный генератор сценариев бесплатно →
            </span>
          </button>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl">
            Умный <span className="text-[#AAFF00]">генератор сценариев</span>
            <br className="hidden md:block" />
            для вирусных видео
          </h1>
          
          <p className="text-gray-400 text-base md:text-lg lg:text-xl text-center max-w-2xl">
            Создавайте профессиональные сценарии для видео с помощью искусственного интеллекта. 
            Экономьте до 90% времени на написании сценариев.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
            <div className="bg-gray-800/30 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#AAFF00]">1M+</div>
              <div className="text-sm text-gray-400">проанализированных видео</div>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#AAFF00]">10 сек</div>
              <div className="text-sm text-gray-400">на генерацию сценария</div>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-[#AAFF00]">90%</div>
              <div className="text-sm text-gray-400">экономии времени</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-sm md:max-w-md mx-auto px-4">
          <div className="bg-gray-800/30 p-2 rounded-lg flex flex-col md:flex-row gap-2 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="flex-1 bg-transparent px-4 py-2.5 outline-none rounded-lg text-sm md:text-base w-full"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#AAFF00] text-black px-4 py-2.5 rounded-lg text-sm md:text-base whitespace-nowrap flex items-center justify-center gap-2 hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Подождите...</span>
                </>
              ) : (
                'Создать сценарий'
              )}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm flex items-center gap-2 justify-center mt-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-xs md:text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#AAFF00]" />
              <span>Без карты</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#AAFF00]" />
              <span>7 дней бесплатно</span>
            </div>
          </div>
        </form>

        <div className="text-xs md:text-sm text-gray-400 text-center">
          Уже используете генератор сценариев?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-[#AAFF00] hover:underline"
          >
            Войти
          </button>
        </div>

        {/* Обновленная бегущая строка */}
        <div className="relative overflow-hidden mt-12 py-8 bg-gradient-to-r from-black via-gray-800/30 to-black">
          <div className="flex space-x-16">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center space-x-16">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#AAFF00] text-lg md:text-xl">●</span>
                    <span className="text-white text-lg md:text-xl">Генератор сценариев</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#AAFF00] text-lg md:text-xl">●</span>
                    <span className="text-white text-lg md:text-xl">Для блогеров</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#AAFF00] text-lg md:text-xl">●</span>
                    <span className="text-white text-lg md:text-xl">Для маркетологов</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#AAFF00] text-lg md:text-xl">●</span>
                    <span className="text-white text-lg md:text-xl">Для агентств</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
