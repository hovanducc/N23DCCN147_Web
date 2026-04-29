require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/students', studentRoutes);

// Route mặc định
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Student Management API',
    version: '1.0.0',
    endpoints: {
      'POST   /api/students':           'Tạo sinh viên mới',
      'GET    /api/students':           'Lấy danh sách sinh viên (page, limit, major)',
      'GET    /api/students/:id':       'Lấy chi tiết sinh viên',
      'PUT    /api/students/:id':       'Cập nhật sinh viên',
      'DELETE /api/students/:id':       'Xóa sinh viên (soft delete)',
      'PATCH  /api/students/:id/score': 'Cập nhật điểm sinh viên',
      'GET    /api/students/top':       'Top sinh viên theo điểm (?limit=5)',
      'GET    /api/students/stats/avg': 'Điểm trung bình',
      'GET    /api/students/search':    'Tìm kiếm sinh viên (?q=keyword)',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route không tồn tại' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Lỗi server nội bộ' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
