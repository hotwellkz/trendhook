// ... остальной код остается прежним ...

import { AIScriptsPage } from './components/AIScriptsPage';

function App() {
  const { user } = useAuth();

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            {/* ... остальные маршруты ... */}
            <Route path="/ai-scripts" element={<AIScriptsPage />} />
            {/* ... остальные маршруты ... */}
          </Routes>
          {user && <ChatWidget />}
        </div>
      </Router>
    </HelmetProvider>
  );
}
