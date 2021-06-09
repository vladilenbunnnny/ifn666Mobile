const mysql = require("mysql2");

//Create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//Connect
connection.connect(err => {
  if (err) throw err;
});

module.exports = (req, res, next) => {
  req.db = connection;
  next();
};
