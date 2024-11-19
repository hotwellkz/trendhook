import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, Home, Eye, EyeOff } from 'lucide-react';
import { auth, googleProvider } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Email sign in error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign in success:', result);
      if (result.user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Google sign in error:', err);
      setError(getErrorMessage(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Неверный формат email';
      case 'auth/user-disabled':
        return 'Аккаунт отключен';
      case 'auth/user-not-found':
        return 'Пользователь не найден';
      case 'auth/wrong-password':
        return 'Неверный пароль';
      case 'auth/popup-blocked':
        return 'Пожалуйста, разрешите всплывающие окна для этого сайта и попробуйте снова.';
      case 'auth/popup-closed-by-user':
        return 'Окно авторизации было закрыто. Пожалуйста, попробуйте снова.';
      case 'auth/cancelled-popup-request':
        return 'Операция была отменена. Пожалуйста, попробуйте снова.';
      case 'auth/operation-not-allowed':
        return 'Этот метод входа временно недоступен. Пожалуйста, используйте другой способ.';
      case 'auth/unauthorized-domain':
        return 'Этот домен не авторизован для входа через Google. Пожалуйста, проверьте настройки Firebase.';
      default:
        return 'Произошла ошибка при входе. Пожалуйста, попробуйте позже или используйте другой способ входа.';
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-[#AAFF00]" />
            <span className="text-2xl font-bold text-white">ViralHooks</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>На главную</span>
          </button>
        </div>

        <div className="bg-gray-800/30 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Вход</h2>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
                placeholder="name@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 pr-10"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
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
              <div className="text-red-500 text-sm p-2 bg-red-500/10 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#AAFF00] text-black py-2.5 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-sm text-gray-400">ИЛИ</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            {isLoading ? 'Вход...' : 'Продолжить с Google'}
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Нет аккаунта?{' '}
            <a href="/signup" className="text-[#AAFF00] hover:underline">
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
