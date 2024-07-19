let express = require("express");
let sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
let app = express();
app.use(express.json());
// database connection
const db = new sqlite3.Database(
  "./userDetails.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("connection successfully");
  }
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});

// retrive data

app.get("/", async (req, res) => {
  const sql = `SELECT * FROM users Where firstname="teja"`;
  const response = await db.all(sql, [], (err, rows) => {
    if (err) return console.error("error found", err.message);
    res.send(rows);
  });
});
