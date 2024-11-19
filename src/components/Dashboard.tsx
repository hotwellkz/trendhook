import React, { useState } from 'react';
import { Activity, LogOut, User, Settings, BarChart2, PlusCircle, AlertCircle, Users } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { ScriptGenerator } from './ScriptGenerator';
import { SavedScripts } from './Dashboard/SavedScripts';
import { useAuth } from '../hooks/useAuth';

// ... остальной код ...

export function Dashboard() {
  // ... остальной код ...

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* ... навигация ... */}

      <div className="flex-1 max-w-6xl mx-auto px-4 py-8">
        {/* ... верхняя часть ... */}

        {isTrialExpired && (
          <div className="mb-8 bg-red-500/10 text-red-500 p-4 rounded-xl flex items-start gap-3">
            {/* ... сообщение об истекшем периоде ... */}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* ... статистика ... */}
        </div>

        {/* Сохраненные сценарии */}
        <SavedScripts />

        {/* Единая кнопка создания сценария */}
        {!showGenerator && (
          <button
            onClick={() => setShowGenerator(true)}
            disabled={isTrialExpired}
            className="flex items-center gap-2 bg-[#AAFF00] text-black px-6 py-3 rounded-xl font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Создать новый сценарий</span>
          </button>
        )}

        {showGenerator && (
          <div className="mb-8">
            <ScriptGenerator />
          </div>
        )}

        {/* ... остальной контент ... */}
      </div>
    </div>
  );
}
