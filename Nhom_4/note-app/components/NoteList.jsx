"use client";

// NoteList nhận notes và onDelete qua props
export default function NoteList({ notes, onDelete }) {
  const emojis = ["🟢", "⚡", "🚀", "🌙", "🖥️", "📌", "✨", "🎯", "💡", "🔥"];

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>Chưa có ghi chú nào. Hãy thêm ghi chú mới!</p>
      </div>
    );
  }

  return (
    <ul className="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note-item">
          <div className="note-content">
            <span className="note-emoji">
              {emojis[index % emojis.length]}
            </span>
            <div className="note-text-group">
              <span className="note-text">{note.text}</span>
              <span className="note-date">{formatDate(note.createdAt)}</span>
            </div>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDelete(note.id)}
            id={`delete-${note.id}`}
          >
            Xóa
          </button>
        </li>
      ))}
    </ul>
  );
}
