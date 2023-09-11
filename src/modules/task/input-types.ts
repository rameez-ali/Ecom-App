import { inputObjectType } from 'nexus'
import { DateTime } from '../scalars'

export const TaskOptionsInputType = inputObjectType({
  name: 'TaskOptionsInput',
  definition(t) {
    t.string('q')
  },
})

export const TaskAdditionInputType = inputObjectType({
  name: 'TaskAdditionInput',

  definition(t) {
    t.nonNull.string('name')
    t.nonNull.string('todoId')
  },
})

export const TaskUpdateInputType = inputObjectType({
  name: 'TaskUpdateInput',
  definition(t) {
    t.string('name')
  },
})

export const GetTaskByIdInputType = inputObjectType({
  name: 'GetTaskByIdInput',
  definition(t) {
    t.nonNull.string('taskId')
  },
})
