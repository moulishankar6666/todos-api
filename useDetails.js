const mongoose = require("mongoose");

const userDetailsScehma = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
});
const User = mongoose.model("usersDetails", userDetailsScehma);
module.exports = User;
