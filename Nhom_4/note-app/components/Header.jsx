"use client";

import { useTheme } from "../context/ThemeContext";

// Header nhận noteCount qua props
export default function Header({ noteCount }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-left">
        <span className="header-icon">📋</span>
        <h1 className="header-title">Ghi Chú Cá Nhân</h1>
      </div>
      <div className="header-right">
        {/* Đếm số ghi chú - nhận từ props */}
        <span className="note-count">{noteCount} ghi chú</span>
        {/* Toggle Dark/Light mode */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={theme === "dark" ? "Chuyển sang Light" : "Chuyển sang Dark"}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
