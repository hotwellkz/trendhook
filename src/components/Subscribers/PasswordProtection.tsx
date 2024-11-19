import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface PasswordProtectionProps {
  onSuccess: () => void;
}

export function PasswordProtection({ onSuccess }: PasswordProtectionProps) {
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
