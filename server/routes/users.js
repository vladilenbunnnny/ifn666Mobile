var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */
router.get("/", function (req, res) {
  req.db.query("SELECT id, email FROM users", (err, results, fields) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post("/", (req, res, next) => {
  const { email, password } = req.body;

  if (email === "") {
    return res.status(400).json({ message: "email field is required." });
  }

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return res.status(400).json({ message: "invalid email address." });
  }

  req.db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    (err, results, fields) => {
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "user with this email address already exists." });
      }
    }
  );

  if (password === "") {
    return res.status(400).json({ message: "password field is required." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be at least 8 characters long." });
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    req.db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hash],
      (err, results, fields) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId, email });
      }
    );
  });
});

module.exports = router;
