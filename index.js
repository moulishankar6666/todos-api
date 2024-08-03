const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { v4 } = require("uuid");
const User = require("./useDetails");
const Todos = require("./todos");
const app = express();
app.use(express.json());
app.use(cors());

const mongooseUrl =
  "mongodb+srv://eventsapp:hQyr9WDPPwHnvjwz@cluster0.z68hmsb.mongodb.net/eventsapp";

async function dbconnection() {
  const result = await mongoose
    .connect(mongooseUrl)
    .then(() => {
      console.log("connected Database ");
    })
    .catch((e) => console.log("Error : ", e.message));
}
dbconnection();
app.listen(5000, () => console.log("sever started"));

//                                       APIs

// create a new user

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.find({ email: email });
  if (user.length === 0) {
    const response = new User({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });
    await response.save();
    res.send({ text: "Registration Successfull" }).status(200);
  } else {
    res.status(400).send({ error: "user email already exists" });
  }
});

// Get user by email

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email: email });

  if (user.length == 0) {
    res.status(400).send({ error: "Invalid User" });
  } else {
    const ispasswordMatched = await bcrypt.compare(password, user[0].password);
    if (ispasswordMatched) {
      res.send({ user, text: "login success" }).status(200);
    } else {
      res.status(400).send({ error: "invalid password" });
    }
  }
});

// create Todo

app.post("/todo", async (req, res) => {
  const {
    title,
    description,
    startDate,
    status = "To do",
    time,
    userid,
  } = req.body;
  try {
    const newTodo = new Todos({
      title,
      description,
      date: startDate,
      time,
      todoStatus: status,
      userid,
    });
    await newTodo.save();
    res.send({ text: "added successfully" }).status(201);
  } catch (error) {
    res.send({ error: error.message });
  }
});

// Get Todos

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todos = await Todos.find({ userid: id });
    res.send(todos).status(201);
  } catch (error) {
    res.send(error.message);
  }
});

// update todo

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        date,
        todoStatus,
      },
      { new: true, upsert: true }
    );

    res.send("updated successfully");
  } catch (error) {
    res.send(error.message);
  }
});

// delete todo

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todos.findByIdAndDelete(id);

    res.send({ text: "deleted successfully" }).status(201);
  } catch (error) {
    res.send(error.message);
  }
});
