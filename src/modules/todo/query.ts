import { IContextType } from 'src/types'
import { idArg, nonNull, extendType, nullable } from 'nexus'

import { TodoList, TodoObjectType, TodoPaginator } from './types'
import {getTodoById, getTodos, deleteTodoById } from './service'
import { GetTodoByIdInputType, TodoOptionsInputType } from './input-types'
import { PaginatorFilterInputType } from '../common/input-types'
import { NexusGenInputs } from 'nexus-typegen'

export const TodoQuery = extendType({
  type: 'Query',
  definition(t) {

    t.field('getTodos', {
      type: TodoPaginator,
      args: {
        paginator: nullable(PaginatorFilterInputType),
      },
      async resolve(_, args, ctx: IContextType) {
        const data = await getTodos(
          ctx,
          args.paginator as NexusGenInputs['PaginatorFilterInput']
        )
        return data
      },
    })
    t.nullable.field('getTodoById', {
      type: TodoObjectType,
      args: {
        data: GetTodoByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await getTodoById(
          ctx,
          data as NexusGenInputs['GetTodoByIdInput']
        )
      },
    })

    t.nullable.field('deleteTodoById', {
      type: TodoObjectType,
      args: {
        data: GetTodoByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await deleteTodoById(
          ctx,
          data as NexusGenInputs['GetTodoByIdInput']
        )
      },
    })
  },
})
