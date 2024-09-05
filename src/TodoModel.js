const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
    id: { 
    type: Number, 
    required: true 
    },
    todo:{ 
    type: String,
    required: true 
    },
    category: { 
    type: String, 
    required: true 
    },
    priority:{ 
    type: String,
    required: true 
    },
    status: { 
    type: String, 
    required: true 
    },
    dueDate:{ 
    type: String,
    required: true 
    },
  });

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo