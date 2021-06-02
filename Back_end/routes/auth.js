const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // TODO: do validation here...
  req.db.query(
    "SELECT id, email, password FROM users WHERE email = ?",
    [email],
    (err, results, fields) => {
      if (err) throw err;
      if (results.length === 0) {
        res.status(401).json({ message: "Invalid username and/or password." });
        return;
      }
      const { password: userPassword, ...user } = results[0];
      bcrypt.compare(password, userPassword, (err, matched) => {
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

// auth/login -> { token: bla2343r4dfde4 }
// watchlist/:user_id?page=0 -> [ { id: 1, symbol: 'APPL', company: " bla bla" ]
