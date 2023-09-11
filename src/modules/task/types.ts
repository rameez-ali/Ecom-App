import { inputObjectType, objectType, interfaceType } from 'nexus'
import { DateTime } from '../scalars'
import { PaginatorObjectType } from '../common/types'

export const TaskGeneralNode = interfaceType({
  name: 'TaskGeneral',
  definition(t) {
    t.nonNull.id('_id')
    t.nullable.string('name')
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})

export const TaskObjectType = objectType({
  name: 'Task',
  definition(t) {
    t.implements(TaskGeneralNode)
  },
})

export const TaskPaginator = objectType({
  name: 'TaskPaginator',
  definition(t) {
    t.nullable.list.nullable.field('data', { type: TaskObjectType })
    t.nullable.field('paginatorInfo', { type: PaginatorObjectType })
  },
})

export const TaskList = objectType({
  name: 'Tasks',
  definition(t) {
    t.nullable.list.nullable.field('data', { type: TaskObjectType })
  },
})
