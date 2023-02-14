const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET;
const tokenLife = process.env.TOKEN_LIFE;

exports.JobseekerLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    pool.query(
      `SELECT * FROM jobseeker WHERE email = $1;`,
      [email],
      (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Error occured at server side"
          });
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];
          const data = {
            user: user.id,
            name: user.name
          };

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              res.status(404).json({
                success: false,
                message: "Error occured at password matching"
              });
            }
            // checking if password is matching or not

            if (isMatch) {
              jwt.sign(data, secret, { expiresIn: tokenLife }, (err, token) => {
                if (err) {
                  res
                    .status(404)
                    .json({ success: false, message: err.message });
                } else {
                  res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                      name: user.name
                    },
                    message: "Login Successful."
                  });
                }
              });
            } else {
              //password is incorrect
              res
                .status(200)
                .json({ success: false, message: "Password incorrect" });
            }
          });
        } else {
          res.status(200).json({
            success: false,
            message: "No user exist with this email id"
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.JobseekerRegistration = async (req, res) => {
  try {
    let { name, email, password, mobileno, workstatus, resume } = req.body;

    //to check email is already exist or not
    pool.query(
      `SELECT * FROM jobseeker WHERE email = $1`,
      [email],
      async (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Server error: " + err.message
          });
        }

        if (results.rows.length > 0) {
          res.status(200).json({
            success: false,
            message: "User with this email id already exists"
          });
        } else {
          //Create Hashing of password
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(password, salt);

          pool.query(
            `insert into jobseeker (name, email, password, mobileno, workstatus, resume) values ($1, $2, $3, $4, $5, $6)`,
            [name, email, secPass, mobileno, workstatus, resume],
            async (err, result) => {
              if (err) {
                res.status(404).json({
                  success: false,
                  message: "Server error: " + err.message
                });
              } else {
                const query_result = await pool.query(
                  `select * from jobseeker where email = $1`,
                  [email]
                );
                const user = query_result.rows[0];
                const data = {
                  user: user.id,
                  name: user.name
                };
                //create a auth-token
                const token = jwt.sign(data, secret, { expiresIn: tokenLife });
                res.status(200).json({
                  success: true,
                  token: `Bearer ${token}`,
                  user: {
                    name: name
                  },
                  message: "User created successfully"
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.EmployerLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    pool.query(
      `SELECT * FROM employer WHERE email = $1;`,
      [email],
      (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Error occured at server side"
          });
        }

        if (results.rows.length > 0) {
          const user = results.rows[0];
          const data = {
            user: user.id,
            name: user.name
          };

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              res.status(404).json({
                success: false,
                message: "Error occured at password matching"
              });
            }
            // checking if password is matching or not

            if (isMatch) {
              jwt.sign(data, secret, { expiresIn: tokenLife }, (err, token) => {
                if (err) {
                  res
                    .status(404)
                    .json({ success: false, message: err.message });
                } else {
                  res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                      name: user.name
                    },
                    message: "Login Successful."
                  });
                }
              });
            } else {
              //password is incorrect
              res
                .status(200)
                .json({ success: false, message: "Password incorrect" });
            }
          });
        } else {
          res.status(200).json({
            success: false,
            message: "No user exist with this email id"
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.EmployerRegistration = async (req, res) => {
  try {
    let { name, password, email, companyname, designation, city } = req.body;

    //to check email is already exist or not
    pool.query(
      `SELECT * FROM employer WHERE email = $1`,
      [email],
      async (err, results) => {
        if (err) {
          res.status(404).json({
            success: false,
            message: "Server error: " + err.message
          });
        }

        if (results.rows.length > 0) {
          res.status(200).json({
            success: false,
            message: "User with this email id already exists"
          });
        } else {
          //Create Hashing of password
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(password, salt);

          pool.query(
            `insert into employer (name, password, email, companyname, designation, city) values ($1, $2, $3, $4, $5, $6)`,
            [name, secPass, email, companyname, designation, city],
            async (err, result) => {
              if (err) {
                res.status(404).json({
                  success: false,
                  message: "Server error: " + err.message
                });
              } else {
                const query_result = await pool.query(
                  `select * from jobseeker where email = $1`,
                  [email]
                );
                const user = query_result.rows[0];
                const data = {
                  user: user.id,
                  name: user.name
                };
                //create a auth-token
                const token = jwt.sign(data, secret, { expiresIn: tokenLife });
                res.status(200).json({
                  success: true,
                  token: `Bearer ${token}`,
                  user: {
                    name: name
                  },
                  message: "User created successfully"
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
