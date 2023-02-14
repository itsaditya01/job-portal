const pool = require("../db");

exports.PostJob = async (req, res) => {
  try {
    const {
      role,
      title,
      description,
      vacancy,
      responsibility,
      city,
      expectedsalary,
      jobpostdate,
      lastdatetoapply
    } = req.body;
    const employerid = req.id;

    pool.query(
      ` insert into jobs (role, title, description, vacancy, employerid, responsibility, city, expectedsalary, jobpostdate, lastdatetoapply) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
      [
        role,
        title,
        description,
        vacancy,
        employerid,
        responsibility,
        city,
        expectedsalary,
        jobpostdate,
        lastdatetoapply
      ],
      function(err, results) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Job posted successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetJobs = async (req, res) => {
  try {
    const employerid = req.id;
    pool.query(
      `select id, title, vacancy, employerid, city, expectedsalary from jobs where employerid=$1 order by id;`,
      [employerid],
      function(err, results) {
        if (err) {
          res.status(404).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, data: results.rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetAllJobs = async (req, res) => {
  try {
    pool.query(
      `select j.id, j.title, j.vacancy, j.employerid, j.city, j.expectedsalary, e.companyname from jobs j inner join employer e on j.employerid = e.id order by j.id;`,
      function(err, results) {
        if (err) {
          res.status(404).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, data: results.rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetJob = async (req, res) => {
  try {
    const id = req.body.id;
    pool.query(
      `select j.title, j.description, j.vacancy, j.employerid, j.responsibility, j.city as location, j.expectedsalary, j.jobpostdate, j.lastdatetoapply, e.name, e.email, e.companyname, e.designation, e.city from jobs j inner join employer e on j.employerid = e.id where j.id = $1;`,
      [id],
      function(err, results) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, data: results.rows[0] });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.ChangeStatus = async (req, res) => {
  try {
    const { id, status, jobid } = req.body;
    pool.query(
      `UPDATE applications SET status = $1 WHERE id = $2;`,
      [status, id],
      function(err, results) {
        if (err) {
          res.status(404).json({ success: false, message: err.message });
        } else {
          if (status === "hired") {
            pool.query(
              `update jobs set vacancy = vacancy - 1 where id = $1;`,
              [jobid],
              function(err, results) {
                if (err) {
                  res
                    .status(404)
                    .json({ success: false, message: err.message });
                } else {
                  res.status(200).json({
                    success: true,
                    message: "Status changed successfully"
                  });
                }
              }
            );
          } else {
            res.status(200).json({
              success: true,
              message: "Status changed successfully"
            });
          }
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.ApplyJob = async (req, res) => {
  try {
    const { jobid } = req.body;
    const jobseekerid = req.id;
    const status = "pending";
    pool.query(`select vacancy from jobs where id = $1;`, [jobid], function(
      err,
      results
    ) {
      if (err) {
        res.status(500).json({ success: false, message: err.message });
      } else {
        if (results.rows[0].vacancy > 0) {
          pool.query(
            `insert into applications (jobid, jobseekerid, status) values ($1, $2, $3);`,
            [jobid, jobseekerid, status],
            function(err, results) {
              if (err) {
                res.status(500).json({ success: false, message: err.message });
              } else {
                res
                  .status(200)
                  .json({ success: true, message: "Job applied successfully" });
              }
            }
          );
        } else {
          res
            .status(200)
            .json({ success: false, message: "No vacancy available" });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetApplicationsForJob = async (req, res) => {
  try {
    const id = req.body.jobid;
    pool.query(
      `select j.name, j.email, j.mobileno, j.workstatus, j.resume, a.id, a.status, a.jobid from jobseeker j inner join applications a on j.id = a.jobseekerid where a.jobid = $1 order by a.id;`,
      [id],
      function(err, results) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, data: results.rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetApplication = async (req, res) => {
  try {
    const jobid = req.body.jobid;
    const jobseekerid = req.id;
    pool.query(
      `select * from applications where jobid = $1 and jobseekerid = $2;`,
      [jobid, jobseekerid],
      function(err, results) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          if (results.rows.length > 0) {
            res
              .status(200)
              .json({ success: true, data: results.rows[0].status });
          } else {
            res.status(200).json({ success: false });
          }
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.GetApplications = async (req, res) => {
  try {
    const id = req.id;
    pool.query(
      `select j.id, j.role, j.title, j.description, a.status, a.jobseekerid from job j inner join application a on j.id = a.jobid where j.jobseekerid = $1;`,
      [id],
      function(err, results) {
        if (err) {
          res.status(500).json({ success: false, message: err.message });
        } else {
          res.status(200).json({ success: true, data: results.rows });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
