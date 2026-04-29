const Student = require('../models/Student');

// POST /api/students - Tạo sinh viên mới
const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({
      success: true,
      message: 'Tạo sinh viên thành công',
      data: student,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `${field} đã tồn tại`,
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/students - Lấy danh sách sinh viên (pagination + filter theo major)
const getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };
    if (req.query.major) {
      filter.major = req.query.major;
    }

    const total = await Student.countDocuments(filter);
    const students = await Student.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/students/:id - Lấy chi tiết sinh viên
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.id,
      isActive: true,
    });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/students/:id - Cập nhật sinh viên
const updateStudent = async (req, res) => {
  try {
    // Không cho phép cập nhật isActive qua route này
    delete req.body.isActive;

    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
    }
    res.status(200).json({ success: true, message: 'Cập nhật thành công', data: student });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ success: false, message: `${field} đã tồn tại` });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/students/:id - Xóa sinh viên (soft delete)
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
    }
    res.status(200).json({ success: true, message: 'Xóa sinh viên thành công (soft delete)' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/students/:id/score - Cập nhật điểm số
const updateScore = async (req, res) => {
  try {
    const { score } = req.body;

    // Validate score
    if (score === undefined || score === null) {
      return res.status(400).json({ success: false, message: 'score là bắt buộc' });
    }
    if (typeof score !== 'number' || score < 0 || score > 100) {
      return res.status(400).json({
        success: false,
        message: 'score phải là số trong khoảng 0 - 100',
      });
    }

    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { score },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sinh viên' });
    }
    res.status(200).json({ success: true, message: 'Cập nhật điểm thành công', data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/students/top?limit=5 - Lấy top sinh viên theo điểm
const getTopStudents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const students = await Student.find({ isActive: true })
      .sort({ score: -1 })
      .limit(limit);
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/students/stats/avg - Tính điểm trung bình
const getAverageScore = async (req, res) => {
  try {
    const result = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, averageScore: { $avg: '$score' } } },
    ]);
    const averageScore = result.length > 0 ? result[0].averageScore.toFixed(2) : 0;
    res.status(200).json({ success: true, data: { averageScore: parseFloat(averageScore) } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/students/search?q=keyword - Tìm kiếm sinh viên theo tên
const searchStudents = async (req, res) => {
  try {
    const keyword = req.query.q || '';
    const students = await Student.find({
      isActive: true,
      name: { $regex: keyword, $options: 'i' },
    });
    res.status(200).json({ success: true, data: students, total: students.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  updateScore,
  getTopStudents,
  getAverageScore,
  searchStudents,
};
