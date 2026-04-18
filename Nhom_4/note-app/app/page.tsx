"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

export default function Home() {
  // useState: quản lý danh sách ghi chú
  const [notes, setNotes] = useState([]);

  // useEffect: Load dữ liệu từ localStorage khi app khởi động
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // useEffect: Lưu dữ liệu vào localStorage mỗi khi notes thay đổi
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Thêm ghi chú mới
  const handleAdd = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  // Xóa ghi chú theo id
  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <main className="app-container">
      {/* Header nhận noteCount qua props */}
      <Header noteCount={notes.length} />

      <div className="content-wrapper">
        {/* NoteForm: thêm ghi chú */}
        <NoteForm onAdd={handleAdd} />

        {/* NoteList: danh sách + xóa qua props */}
        <NoteList notes={notes} onDelete={handleDelete} />
      </div>
    </main>
  );
}
