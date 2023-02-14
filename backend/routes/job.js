const express = require("express");
const router = express.Router();
const verifytoken = require("../middleware/verifytoken");
const {
  PostJob,
  GetAllJobs,
  ChangeStatus,
  ApplyJob,
  GetApplications,
  GetJob,
  GetApplication,
  GetJobs,
  GetApplicationsForJob
} = require("../controller/jobController");

//routes for job at employer side
router.post("/postjob", verifytoken, PostJob);
router.post("/changestatus", ChangeStatus);
router.get("/getjobs", verifytoken, GetJobs);
router.post("/getapplications/employer", verifytoken, GetApplicationsForJob);

//routes for job at jobseeker side
router.get("/getalljobs", GetAllJobs);
router.post("/getjob", GetJob);
router.post("/applyjob", verifytoken, ApplyJob);
router.post("/getapplication", verifytoken, GetApplication);
router.get("/getapplications/jobseeker", verifytoken, GetApplications);

module.exports = router;
