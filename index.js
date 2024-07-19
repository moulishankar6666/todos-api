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

// drop table

// db.run("DROP TABLE users", [], (err) => console.error("error found", err));

// create table

// db.run(
//   `CREATE TABLE users(id int PRIMARY KEY,firstname VARCHAR(50),lastname VARCHAR(50),username VARCHAR(50),password VARCHAR(50),email VARCHAR(50))`,
//   [],
//   (err) => console.error("error found", err)
// );

// insert into table

// const sql = `INSERT INTO users(id,firstname,lastname,username,password,email) VALUES(?,?,?,?,?,?)`;
// db.run(
//   sql,
//   [2, "teja", "kumar", "teja999", "teja@999", "teja999@gmail.com"],
//   (err) => console.error("error found", err)
// );

// retrive data

app.get("/", async (req, res) => {
  const sql = `SELECT * FROM users Where firstname="teja"`;
  const response = await db.all(sql, [], (err, rows) => {
    if (err) return console.error("error found", err.message);
    res.send(rows);
  });
});

// const sql = `SELECT * FROM users`;
// const response = db.all(sql, [], (err, rows) => {
//   if (err) return console.error("error found", err.message);

//   rows.forEach((row) => {
//     console.log(row);
//   });
// });

// db.close((err) => {
//   if (err) return console.error(err.message);
// });
