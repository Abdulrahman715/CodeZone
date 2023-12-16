
const express = require('express');

const router = express.Router();

let coursesController = require("../controllers/controller");

const {validationSchema} = require('../Middleware/courses.middleware');
const verifyToken = require('../Middleware/verifytoken');
const userRoles = require('../utils/roleUsers');
const allowedTo = require('../Middleware/allowedTo');


router
  .route("/")
  .get(coursesController.getAllCourse)
  .post(verifyToken, allowedTo(userRoles.MANAGER), validationSchema(), coursesController.addCourse);

router
  .route("/:courseId")
  .get(coursesController.getSingleCourse)
  .patch(coursesController.updatePatchCourse)
  .put(coursesController.updatePatchCourse)
  .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesController.deletedCourse);


module.exports = router;