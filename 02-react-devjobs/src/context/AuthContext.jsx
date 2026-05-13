import { createContext, useState, use } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoogedIn, setIsLoogedIn] = useState(false);

  const login = function() {
    setIsLoogedIn(true);
  };

  const logout = function() {
    setIsLoogedIn(false);
  };

  const value = {
    isLoogedIn,
    login,
    logout
  };

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  );
};

export function useAuth() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}