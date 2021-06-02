const express = require("express");
const jwt = require("express-jwt");
const router = express.Router();

router.get(
  "/:userId",
  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  (req, res) => {
    const { userId } = req.params;
    const { offset, limit = 21 } = req.query; // TODO: pagination.

    if (req.user.userId != userId) {
      return res.status(403).json({
        message: "You must be a watchlist owner to perform this action. ",
      });
    }

    req.db.query(
      "SELECT id, symbol, company FROM watchlist WHERE user_id = ? ORDER BY added_at DESC LIMIT ?",
      [userId, limit],
      (err, results, fields) => {
        if (err) throw err;
        res.status(200).json(results);
      }
    );
  }
);

router.post(
  "",
  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  (req, res) => {
    const { userId, symbol, company } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId field is required " });
    }

    if (!symbol) {
      return res.status(400).json({ message: "symbol field is required " });
    }
    // TODO: check that symbol is valid (length, and it exists).

    if (!company) {
      return res.status(400).json({ message: "company field is required " });
    }
    // TODO:  check that company is valid(length, and it exists).

    if (req.user.userId !== userId) {
      return res.status(403).json({
        message: "You must be a watchlist owner to perform this action. ",
      });
    }

    req.db.query(
      "INSERT INTO watchlist (user_id, symbol, company) VALUES (?, ?, ?)",
      [userId, symbol, company],
      (err, results, fields) => {
        console.log(results);
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
      }
    );
  }
);

module.exports = router;
