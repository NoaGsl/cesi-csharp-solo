'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const AuthContext = createContext({
  isConnected: false,
  // eslint-disable-next-line
  setIsConnected: (value: boolean) => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-auth", {
          credentials: "include",
        });
        const data = await response.json();

        if (data.authenticated) {
          setIsConnected(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, [isConnected]);

  return (
    <AuthContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
