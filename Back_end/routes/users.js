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
  // TODO: do validation here...
  if (email === "test@test.com") {
    return res.status(400).send({ message: "This email is unavailable." });
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
