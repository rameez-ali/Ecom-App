import { TaskMutation } from './mutation'
import { TaskQuery } from './query'
import {
  TaskGeneralNode,
  TaskObjectType,
  TaskPaginator,
  TaskList,
} from './types'
import {
  TaskOptionsInputType,
  TaskAdditionInputType,
  TaskUpdateInputType,
  GetTaskByIdInputType,
} from './input-types'

const Users = [
  TaskObjectType,
  TaskPaginator,
  TaskGeneralNode,
  TaskQuery,
  TaskMutation,
  TaskOptionsInputType,
  TaskAdditionInputType,
  TaskUpdateInputType,
  GetTaskByIdInputType,
  TaskList,
]

export default Users
