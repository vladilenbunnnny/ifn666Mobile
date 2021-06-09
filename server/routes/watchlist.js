const express = require("express");
const jwt = require("express-jwt");
const router = express.Router();

router.get(
  "/:userId",
  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  (req, res) => {
    const { userId } = req.params;
    const { offset, limit = 21 } = req.query;

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

    if (!company) {
      return res.status(400).json({ message: "company field is required " });
    }

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

// Delete from watchlist

router.delete(
  "/:stockId",
  jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  (req, res) => {
    const { stockId } = req.params;
    req.db.query(
      "SELECT user_id FROM watchlist WHERE id = ?",
      [stockId],
      (err, results, fields) => {
        if (err) throw err;
        if (results.length === 0) {
          return res.status(404).json({ message: "stock was not found." });
        }
        console.log("results", results);
        const stock = results[0];
        if (req.user.userId != stock.user_id) {
          return res.status(403).json({
            message: "You must be an owner the stock to perform this action. ",
          });
        }

        req.db.query(
          "DELETE FROM watchlist WHERE id = ?",
          [stockId],
          (err, results, fields) => {
            if (err) throw err;
            console.log("Number of records deleted: " + results.affectedRows);
            return res.status(204).end();
          }
        );
      }
    );
  }
);

module.exports = router;
