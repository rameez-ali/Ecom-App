import mongoose, { Types, Model } from 'mongoose'

export interface ITaskTodo {
  _id: string
  content: string
  dueDate: Date
  done: boolean
}

export interface ITaskTodoDocument extends ITaskTodo, Document {}

export interface ITaskTodoModel extends Model<ITaskTodoDocument> {}

const TaskTodoSchema = new mongoose.Schema<ITaskTodoDocument, ITaskTodoModel>(
  {
    content: { type: String },
    dueDate: { type: Date },
    done: { type: Boolean },
  },
  { timestamps: true }
)

const TaskTodo = mongoose.model<ITaskTodoDocument, ITaskTodoModel>(
  'Todo',
  TaskTodoSchema
)

export default TaskTodo
