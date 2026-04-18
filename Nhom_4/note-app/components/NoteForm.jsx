"use client";

import { useState } from "react";

// NoteForm dùng useState để quản lý input, nhận onAdd qua props
export default function NoteForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText(""); // Reset input sau khi thêm
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        id="note-input"
        type="text"
        className="note-input"
        placeholder="Nhập ghi chú mới..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button id="add-btn" type="submit" className="add-btn">
        + Thêm
      </button>
    </form>
  );
}
