{/* Previous imports remain the same */}

export function ScriptGenerator() {
  {/* Previous state and functions remain the same */}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Генератор сценариев</h2>
        <div className="text-sm text-gray-400">
          Осталось токенов: <span className="text-[#AAFF00]">{tokens}</span>
        </div>
      </div>
      
      <form onSubmit={handleGenerate} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Тема видео
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            placeholder="Например: Как начать инвестировать"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Длительность (секунды)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
            min="15"
            max="180"
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Стиль
          </label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 appearance-none cursor-pointer hover:bg-black/30 transition-colors"
            required
            disabled={loading}
          >
            <option value="" className="bg-gray-900">Выберите стиль</option>
            <option value="educational" className="bg-gray-900">Обучающий</option>
            <option value="entertaining" className="bg-gray-900">Развлекательный</option>
            <option value="motivational" className="bg-gray-900">Мотивационный</option>
            <option value="storytelling" className="bg-gray-900">Сторителлинг</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Целевая аудитория
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50"
            placeholder="Например: Начинающие инвесторы 25-35 лет"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Цель видео
          </label>
          <select
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 appearance-none cursor-pointer hover:bg-black/30 transition-colors"
            required
            disabled={loading}
          >
            <option value="" className="bg-gray-900">Выберите цель</option>
            <option value="awareness" className="bg-gray-900">Повышение узнаваемости</option>
            <option value="engagement" className="bg-gray-900">Вовлечение аудитории</option>
            <option value="conversion" className="bg-gray-900">Конверсия</option>
            <option value="education" className="bg-gray-900">Обучение</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#AAFF00] text-black py-2.5 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Генерация...</span>
            </>
          ) : (
            'Сгенерировать сценарий'
          )}
        </button>
      </form>

      {script && (
        <div className="space-y-6">
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Сценарий</h3>
            <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">{script}</pre>
          </div>

          {analysis && (
            <div className="bg-gray-800/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Анализ вирусного потенциала</h3>
              <pre className="whitespace-pre-wrap text-gray-300 font-mono text-sm">{analysis}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
