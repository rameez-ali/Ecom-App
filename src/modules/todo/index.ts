import { TodoMutation } from './mutation'
import { TodoQuery } from './query'
import {
  TodoGeneralNode,
  TodoObjectType,
  TodoPaginator,
  TodoList,
} from './types'
import {
  TodoOptionsInputType,
  TodoAdditionInputType,
  TodoUpdateInputType,
  GetTodoByIdInputType,
} from './input-types'

const Todos = [
  TodoObjectType,
  TodoPaginator,
  TodoGeneralNode,
  TodoQuery,
  TodoMutation,
  TodoOptionsInputType,
  TodoAdditionInputType,
  TodoUpdateInputType,
  GetTodoByIdInputType,
  TodoList,
]

export default Todos
