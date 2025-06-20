import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import axios from '../services/axiosInstance';
import type { User } from '../types/user';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('/api/v1/users/me');
        if (res.data.status === 'success') {
          setUser(res.data.data.data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  const value: UserContextType = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

