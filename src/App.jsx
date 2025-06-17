// src/App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ProtectedRoute from '@/routes/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
