import { inputObjectType } from 'nexus'
import { DateTime } from '../scalars'

export const TodoOptionsInputType = inputObjectType({
  name: 'TodoOptionsInput',
  definition(t) {
    t.string('q')
  },
})

export const TodoAdditionInputType = inputObjectType({
  name: 'TodoAdditionInput',

  definition(t) {
    t.nonNull.string('content')
    t.nonNull.dateTime('dueDate')
    t.field('dueDate', { type: 'DateTime' })
    t.nonNull.boolean('done')
  },
})

export const TodoUpdateInputType = inputObjectType({
  name: 'TodoUpdateInput',
  definition(t) {
    t.string('content')
    t.field('dueDate', { type: 'DateTime' })
    t.boolean('done', { default: false })
  },
})

export const GetTodoByIdInputType = inputObjectType({
  name: 'GetTodoByIdInput',
  definition(t) {
    t.nonNull.string('todoId')
  },
})
