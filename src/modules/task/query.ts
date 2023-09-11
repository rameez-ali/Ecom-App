import { IContextType } from 'src/types'
import { idArg, nonNull, extendType, nullable } from 'nexus'

import { TaskList, TaskObjectType, TaskPaginator } from './types'
import { deleteTaskById, getTaskById, getTasks } from './service'
import { GetTaskByIdInputType, TaskOptionsInputType } from './input-types'
import { PaginatorFilterInputType } from '../common/input-types'
import { NexusGenInputs } from 'nexus-typegen'

export const TaskQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getTasks', {
      type: TaskPaginator,
      args: {
        options: nullable(TaskOptionsInputType),
        paginator: nullable(PaginatorFilterInputType),
      },
      async resolve(_, args, ctx: IContextType) {
        const data = await getTasks(
          ctx,
          args.paginator as NexusGenInputs['PaginatorFilterInput']
        )
        return data
      },
    })
    t.nullable.field('getTaskById', {
      type: TaskObjectType,
      args: {
        data: GetTaskByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await getTaskById(
          ctx,
          data as NexusGenInputs['GetTaskByIdInput']
        )
      },
    })

    t.nullable.field('deleteTaskById', {
      type: TaskObjectType,
      args: {
        data: GetTaskByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await deleteTaskById(
          ctx,
          data as NexusGenInputs['GetTaskByIdInput']
        )
      },
    })
  },
})
