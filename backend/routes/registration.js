const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const sendEmail = require('../utils/sendEmail'); 

router.post('/', async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const existing = await Registration.findOne({ studentId, courseId });
    if (existing) return res.status(400).json({ msg: 'Already registered' });

    const reg = new Registration({ studentId, courseId });
    await reg.save();

    // ✅ Fetch full registration details with populated student and course
    const fullReg = await Registration.findById(reg._id)
      .populate('studentId')
      .populate('courseId');

    const studentEmail = fullReg.studentId.email;
    const studentName = fullReg.studentId.name || 'Student';
    const courseName = fullReg.courseId.name;

    const message = `Hi ${studentName},\n\nYou have successfully submitted your registration for "${courseName}".\nStatus: PENDING approval by admin.\n\nWe will notify you once your registration is reviewed.\n\nRegards,\nCourse Registration System`;

    await sendEmail(studentEmail, 'Course Registration Received', message);

    res.json({ msg: 'Registration submitted and confirmation email sent', reg });

  } catch (err) {
    console.error('❌ Error during registration:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Get student’s registrations
router.get('/:studentId', async (req, res) => {
  const registrations = await Registration.find({ studentId: req.params.studentId }).populate('courseId');
  res.json(registrations);
});

// Get all registrations with course + student info
router.get('/', async (req, res) => {
  const registrations = await Registration.find()
    .populate('courseId')
    .populate('studentId');
  res.json(registrations);
});

router.patch('/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const reg = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('studentId').populate('courseId');

    if (!reg) return res.status(404).json({ msg: 'Registration not found' });

    // ✅ Send email to student
    const studentEmail = reg.studentId.email;
    const studentName = reg.studentId.name || 'Student';
    const courseName = reg.courseId.name || 'a course';

    const message = `Hi ${studentName},\n\nYour registration for "${courseName}" has been updated to: ${status.toUpperCase()}.\n\nRegards,\nAdmin`;

    await sendEmail(studentEmail, 'Course Registration Status Update', message);

    res.json({ msg: `Registration ${status}`, reg });

  } catch (err) {
    console.error('❌ Error updating registration:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/stats/course-counts', async (req, res) => {
  const result = await Registration.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'course'
      }
    },
    { $unwind: '$course' },
    {
      $group: {
        _id: '$course.name',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
  res.json(result);
});

// Get registration count per faculty
router.get('/stats/faculty-distribution', async (req, res) => {
  const result = await Registration.aggregate([
    {
      $lookup: {
        from: 'courses',
        localField: 'courseId',
        foreignField: '_id',
        as: 'course'
      }
    },
    { $unwind: '$course' },
    {
      $group: {
        _id: '$course.faculty',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
  res.json(result);
});

router.get('/stats/yearly-trends', async (req, res) => {
  const result = await Registration.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
  res.json(result);
});


module.exports = router;
