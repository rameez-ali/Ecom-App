const mongoose = require('mongoose')

const Todo = mongoose.model(
  'Todo',
  new mongoose.Schema({
    userId:String,
    content: String,
    dueDate: Date,
    done: Boolean,
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  })
)

module.exports = Todo
