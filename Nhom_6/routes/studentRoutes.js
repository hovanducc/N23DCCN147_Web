const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/top', studentController.getTopStudents);
router.get('/stats/avg', studentController.getAverageScore);
router.get('/search', studentController.searchStudents);

router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);

router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.patch('/:id/score', studentController.updateScore);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
