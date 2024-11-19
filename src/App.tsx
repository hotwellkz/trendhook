import { HelmetProvider } from 'react-helmet-async';
// ... остальные импорты

function App() {
  const { user } = useAuth();

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* ... остальные роуты */}
          </Routes>
          {user && <ChatWidget />}
        </div>
      </Router>
    </HelmetProvider>
  );
}
