import { inputObjectType, objectType, interfaceType } from 'nexus'
import { DateTime } from '../scalars'
import { PaginatorObjectType } from '../common/types'

export const TodoGeneralNode = interfaceType({
  name: 'TodoGeneral',
  definition(t) {
    t.nonNull.id('_id')
    t.nullable.string('content')
    t.nullable.dateTime('dueDate')
    t.nullable.list.nullable.field('tasks', {type: "Task"})
    t.nullable.boolean('done')
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})

export const TodoObjectType = objectType({
  name: 'Todo',
  definition(t) {
    t.implements(TodoGeneralNode)
  },
})

export const TodoPaginator = objectType({
  name: 'TodoPaginator',
  definition(t) {
    t.nullable.list.nullable.field('data', { type: TodoObjectType })
    t.nullable.field('paginatorInfo', { type: PaginatorObjectType })
  },
})

export const TodoList = objectType({
  name: 'Todos',
  definition(t) {
    t.nullable.list.nullable.field('data', { type: TodoObjectType })
  },
})
