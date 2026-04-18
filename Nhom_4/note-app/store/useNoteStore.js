import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNoteStore = create(
  persist(
    (set) => ({
      notes: [],
      isDarkMode: false,

      addNote: (text) => set((state) => ({
        notes: [{ id: Date.now(), text, time: new Date().toLocaleString('vi-VN') }, ...state.notes]
      })),

      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter(note => note.id !== id)
      })),

      toggleTheme: () => set((state) => ({ 
        isDarkMode: !state.isDarkMode 
      })),
    }),
    { name: 'note-storage' } 
  )
);