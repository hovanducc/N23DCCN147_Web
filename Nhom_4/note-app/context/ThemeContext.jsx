"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 1. Tạo Context
const ThemeContext = createContext();

// 2. Tạo Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  // Load theme từ localStorage khi mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Lưu theme vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook useTheme
export function useTheme() {
  return useContext(ThemeContext);
}
