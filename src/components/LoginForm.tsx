import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (success: boolean) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'French' && password === 'Vanilla') {
      setError('');
      onLogin(true);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Sign in to your account
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>
        
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/signup" className="text-black hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}