const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "") {
    return res.status(400).json({ message: "email field is required." });
  }

  if (password === "") {
    return res.status(400).json({ message: "password field is required." });
  }

  req.db.query(
    "SELECT id, email, password FROM users WHERE email = ?",
    [email],
    (err, results, fields) => {
      console.log(results);
      if (err) throw err;
      if (results.length === 0) {
        res.status(401).json({ message: "Invalid username and/or password." });
        return;
      }
      const { password: userPassword, ...user } = results[0];
      bcrypt.compare(password, userPassword, (err, matched) => {
        if (err) throw err;
        if (!matched) {
          res
            .status(401)
            .json({ message: "Invalid username and/or password." });
        } else {
          res.status(200).json({
            token: jwt.sign(
              { userId: user.id, email: user.email },
              process.env.JWT_SECRET
            ),
          });
        }
      });
    }
  );
});

module.exports = router;
