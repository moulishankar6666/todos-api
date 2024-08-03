const mongooose = require("mongoose");

const TodosSchema = new mongooose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  todoStatus: String,
  userid: String,
});

const Todos = mongooose.model("Todos", TodosSchema);
module.exports = Todos;
