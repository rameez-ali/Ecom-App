import { GraphQLError } from 'graphql'
import { NexusGenInputs } from './../../../nexus-typegen'
import { idArg, extendType, nonNull, stringArg } from 'nexus'
import { addTask, getTaskById, updateTaskById } from './service'
import {
  GetTaskByIdInputType,
  TaskOptionsInputType,
  TaskAdditionInputType,
  TaskUpdateInputType,
} from './input-types'
import { TaskObjectType, TaskPaginator } from './types'
import { ReturnMessageObjectType } from '../common/types'
import { Console } from 'console'

export const TaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // Register Job Seeker
    t.nullable.field('addTask', {
      type: TaskObjectType,
      args: {
        data: TaskAdditionInputType,
      },
      resolve(_, args) {
        // @ts-ignore
        const { data } = args

        return addTask(data as NexusGenInputs['TaskAdditionInput'])
      },
    })

    t.nullable.field('updateTaskById', {
      type: TaskObjectType,
      args: {
        data: TaskUpdateInputType,
        taskId: GetTaskByIdInputType,
      },
      async resolve(_, args, ctx) {
        const { data, taskId } = args
        console.log(data)
        return await updateTaskById({
          ctx,
          payload: data as NexusGenInputs['TaskUpdateInput'],
          taskIdInput: taskId as NexusGenInputs['GetTaskByIdInput'],
        })
      },
    })
  },
})
