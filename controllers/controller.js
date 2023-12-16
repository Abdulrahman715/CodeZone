let { courses } = require("../data/courses");

const httpStatusText = require('../utils/httpStatusText');

const Course = require('../Models/courses.model');

const { validationResult } = require("express-validator");


const getAllCourse = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;

  const skip = (page - 1) * limit;


  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({
    status: httpStatusText.SUCCESS,
    data: {
      courses : courses
    }
  });
};

const getSingleCourse = async(req, res) => {
  try {
      const course = await Course.findById(req.params.courseId);
      if (!course) {
        return res.status(404).json({
          status: httpStatusText.FAIL,
          data: {
             course : "this course not found yet" 
          }
        });
      }
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
          course: course,
        },
      });
  } catch (err) {
    return res.status(400).json({
      status: httpStatusText.ERROR,
      data:err,
      message:"invalid object id"
    });
  }
};

const addCourse = async(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: httpStatusText.FAIL,
      data: {
        course: errors.array()
      }
    });
  }

  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: {
      newcourse : newCourse
    }
  });
};

const updatePatchCourse = async(req, res) => {
  const courseId = req.params.courseId;
  
  const updatedCourse = await Course.findByIdAndUpdate(courseId, { $set: { ...req.body } });
  
  res.json({
    status: httpStatusText.SUCCESS,
    data: {
      oldcourse: updatedCourse,
    },
  });
};

const updatePutCourse = async(req, res) => {
  const courseId = req.params.courseId;

  const updatedCourse = await Course.findByIdAndUpdate(courseId, { $set: { ...req.body } });

  res.json(updatedCourse);
};

// still courses the first line in the bage not constant
const deletedCourse = async (req, res) => {
  
   await Course.deleteOne({_id:req.params.courseId})
  res.json({
    status: httpStatusText.SUCCESS,
    data: null,
    message : "deleted is done"
  });
};

module.exports = {
  getAllCourse,
  getSingleCourse,
  addCourse,
  updatePatchCourse,
  updatePutCourse,
  deletedCourse,
};
