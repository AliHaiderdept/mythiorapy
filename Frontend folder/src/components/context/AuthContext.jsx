import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const openLogin = () => {
    setMode("login");
    setAuthOpen(true);
  };

  const openRegister = () => {
    setMode("register");
    setAuthOpen(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authOpen,
        setAuthOpen,
        mode,
        setMode,
        openLogin,
        openRegister,
        closeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);