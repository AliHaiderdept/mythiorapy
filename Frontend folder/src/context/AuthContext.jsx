import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [theme, setTheme] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("mh-settings") || "{}");
      return saved.darkMode ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [fontSize, setFontSize] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("mh-settings") || "{}");
      return saved.fontSize || "Medium";
    } catch {
      return "Medium";
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    document.documentElement.classList.toggle("theme-light", theme === "light");
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.fontSize = fontSize.toLowerCase();

    try {
      const saved = JSON.parse(localStorage.getItem("mh-settings") || "{}");
      localStorage.setItem("mh-settings", JSON.stringify({
        ...saved,
        darkMode: theme === "dark",
        fontSize,
      }));
    } catch {
      localStorage.setItem("mh-settings", JSON.stringify({
        darkMode: theme === "dark",
        fontSize,
      }));
    }
  }, [theme, fontSize]);

  const toggleTheme = () => {
    setTheme((current) => current === "dark" ? "light" : "dark");
  };

  const openAuth = (nextMode = "login") => {
    setMode(nextMode);
    setAuthOpen(true);
  };

  return (
    <AuthContext.Provider value={{
      authOpen,
      setAuthOpen,
      mode,
      setMode,
      openAuth,
      theme,
      setTheme,
      toggleTheme,
      fontSize,
      setFontSize,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
