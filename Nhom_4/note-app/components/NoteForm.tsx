'use client';
import { useState } from 'react';
import { useNoteStore } from '@/store/useNoteStore';

// Không cần nhận props { onAdd } nữa
export default function NoteForm() {
  const [text, setText] = useState('');
  const addNote = useNoteStore((state) => state.addNote); // Lấy hàm trực tiếp từ Zustand

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      addNote(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập ghi chú mới..."
        className="flex-1 p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Thêm
      </button>
    </form>
  );
}