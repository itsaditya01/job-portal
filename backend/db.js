// jobs : id, title, description, vacancy, employerid, responsibility, city, expectedsalary, jobpostdate, lastdatetoapply
// employer : id, name, password, email, companyname, designation, city
// jobseeker : id, name, email, password, mobileno, workstatus, resume
// applications : id, jobid, jobseekerid, status

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "job-portal",
  password: "aditya",
  port: 5432
});

module.exports = pool;
