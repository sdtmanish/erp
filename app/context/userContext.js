'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({ UserName: '', UserType: '', ClassDesination: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userData');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.UserName) {
          setUser(parsed);
        } else {
          setError('User name not found.');
        }
      } else {
        setError('No user data found.');
      }
    } catch {
      setError('Error reading user data.');
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
