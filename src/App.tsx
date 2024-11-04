import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { ClientSelection } from './components/ClientSelection';
import { getAuthStatus, setAuthStatus } from './utils/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus());

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success);
    setAuthStatus(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthStatus(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-center">
        {!isAuthenticated ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <ClientSelection onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;