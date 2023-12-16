const { body } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("title must be included")
      .isLength({ min: 3 })
      .withMessage("lenght must be minimum 3 letters"),
    body("price")
      .notEmpty()
      .withMessage("price must be included")
      .isLength({ min: 3 })
      .withMessage("lenght must be minimum 3 numbers"),
  ];
};


module.exports = {validationSchema};