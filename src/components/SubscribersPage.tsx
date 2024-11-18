{/* Обновляем только измененные части, остальной код остается прежним */}

// В начале файла код остается тем же...

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
              <span className="hidden sm:inline">Назад</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold">Подписчики</h1>
          <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#AAFF00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#88CC00] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Добавить</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Экспорт</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск по email или имени..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#AAFF00]/50 border border-gray-700/50"
            />
          </div>
        </div>

        <div className="bg-gray-800/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left p-4 font-medium text-gray-400">Email</th>
                  <th className="text-left p-4 font-medium text-gray-400 hidden sm:table-cell">Имя</th>
                  <th className="text-left p-4 font-medium text-gray-400 hidden md:table-cell">План</th>
                  <th className="text-left p-4 font-medium text-gray-400">Статус</th>
                  <th className="text-left p-4 font-medium text-gray-400 hidden lg:table-cell">Токены</th>
                  <th className="text-right p-4 font-medium text-gray-400">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-gray-800 last:border-b-0">
                    <td className="p-4 min-w-[200px]">
                      <div className="flex flex-col">
                        <span>{subscriber.email}</span>
                        <span className="text-gray-400 text-sm block sm:hidden">{subscriber.displayName}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">{subscriber.displayName}</td>
                    <td className="p-4 hidden md:table-cell">{subscriber.subscription?.plan || 'free'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                        subscriber.subscription?.status === 'active' ? 'bg-green-500/20 text-green-500' :
                        subscriber.subscription?.status === 'trial' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {subscriber.subscription?.status || 'expired'}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">{subscriber.subscription?.tokensLeft || 0}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingSubscriber(subscriber)}
                          className="p-2 text-gray-400 hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(subscriber.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
