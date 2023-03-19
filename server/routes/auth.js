const {
  getAllTeachers,
  getAllStudents,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/allteachers/:id", getAllTeachers);
router.get("/allstudent/:id", getAllStudents);

module.exports = router;
