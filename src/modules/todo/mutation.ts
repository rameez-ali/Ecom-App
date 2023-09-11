import { GraphQLError } from 'graphql'
import { NexusGenInputs } from './../../../nexus-typegen'
import { idArg, mutationType, nonNull, stringArg, extendType } from 'nexus'
import { addTodo, getTodoById, updateTodoById, updateTodo } from './service'
import {
  TodoAdditionInputType,
  GetTodoByIdInputType,
  TodoOptionsInputType,
  TodoUpdateInputType,
} from './input-types'
import { TodoObjectType, TodoList, TodoPaginator } from './types'
import { ReturnMessageObjectType } from '../common/types'

export const TodoMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // Register Job Seeker

    t.nullable.field('addTodo', {
      type: TodoObjectType,
      args: {
        data: TodoAdditionInputType,
      },
      async resolve(_, args, ctx) {
        const { data } = args
        return await addTodo({
          ctx,
          payload: data as NexusGenInputs['TodoAdditionInput'],
        })
      },
    })

    t.nullable.field('updateTodoById', {
      type: TodoObjectType,
      args: {
        data: TodoUpdateInputType,
        todoId: GetTodoByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data, todoId } = args
        return await updateTodoById({
          ctx,
          payload: data as NexusGenInputs['TodoUpdateInput'],
          todoIdInput: todoId as NexusGenInputs['GetTodoByIdInput'],
        })
      },
    })
  },
})
