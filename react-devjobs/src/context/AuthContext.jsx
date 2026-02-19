import { createContext, useState } from "react";

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
