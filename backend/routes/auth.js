const express = require("express");
const router = express.Router();

const {
  JobseekerLogin,
  JobseekerRegistration,
  EmployerLogin,
  EmployerRegistration
} = require("../controller/authController");

router.post("/login/jobseeker", JobseekerLogin);
router.post("/signup/jobseeker", JobseekerRegistration);

router.post("/login/employer", EmployerLogin);
router.post("/signup/employer", EmployerRegistration);

module.exports = router;
