import React, { useState, useEffect } from 'react';
import { AuthView } from './AuthView';
import { DashboardView } from './DashboardView';

export function FinancePage() {
  const [userId, setUserId] = useState<string | null>(null);

  // Maintain local login state explicitly
  useEffect(() => {
    const savedSession = localStorage.getItem('cs50x_finance_session');
    if (savedSession) {
      setUserId(savedSession);
    }
  }, []);

  const handleLogin = (id: string) => {
    localStorage.setItem('cs50x_finance_session', id);
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem('cs50x_finance_session');
    setUserId(null);
  };

  return (
    <>
      {userId ? (
        <DashboardView userId={userId} onLogout={handleLogout} />
      ) : (
        <AuthView onLogin={handleLogin} />
      )}
    </>
  );
}
