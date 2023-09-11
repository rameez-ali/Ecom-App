import { checkIfUserAlreadyExist } from './helpers'
import { comparePassword, hashPassword } from '../../utils/auth.utils'
import { GraphQLError } from 'graphql'
import Task, { ITask, ITaskDocument } from './model'
import Todo from '../todo/model'
import { NexusGenInputs, NexusGenObjects } from 'nexus-typegen'
import { signJwt } from '../../utils/jwt.utils'
import { IContextType } from '../../types'
import { FilterQuery } from 'mongoose'

export const getTasks = async (
  ctx: IContextType,
  paginator: NexusGenInputs['PaginatorFilterInput']
): Promise<NexusGenObjects['TaskPaginator']> => {
  const todos = await Task.find()

  if (!todos) {
    throw new GraphQLError("Task doesn't exist")
  }

  return {
    data: todos,
  }
}

export const addTask = async (
  payload: NexusGenInputs['TaskAdditionInput']
): Promise<NexusGenObjects['Task']> => {
  const { name, todoId } = payload

  const createdTask = await Task.create({
    name,
  })

  const h = await Todo.findByIdAndUpdate(
    todoId,
    { $push: { tasks: createdTask._id } },
    { new: true, useFindAndModify: false }
  )

  console.log(h)

  return createdTask
}

export const getTask = async (
  ctx: IContextType
): Promise<NexusGenObjects['Task']> => {
  const userId = ctx.user._id
  if (!userId) {
    throw new GraphQLError('Not Authorize')
  }

  const task = await Task.findOne({ _id: userId })

  if (!task) {
    throw new GraphQLError("Task doesn't exist")
  }

  return task
}

export const deleteTaskById = async (
  ctx: IContextType,
  payload: NexusGenInputs['GetTaskByIdInput']
): Promise<NexusGenObjects['User']> => {
  if (ctx.user) {
    const id = ctx.user._id
    if (!id) {
      throw new GraphQLError('Not Authorize')
    }

    const tasks = await Task.findByIdAndDelete({_id:payload.taskId})

    if (!tasks) {
      throw new GraphQLError("Task doesn't exist")
    }

    // Detaching this Task from Todo
    const todos = await Todo.findOne({tasks:payload.taskId})
    if(todos){
      await Todo.findByIdAndUpdate(todos._id, {
        $pull: { tasks: payload.taskId },
      });
    }


    return tasks;

  }

  throw new GraphQLError('Not Authorize')
}

export const getTaskById = async (
  ctx: IContextType,
  payload: NexusGenInputs['GetUserByIdInput']
): Promise<NexusGenObjects['Task']> => {
  if (ctx.user) {
    const id = ctx.user._id
    if (!id) {
      throw new GraphQLError('Not Authorize')
    }

    const task = await Task.findOne({ _id: payload.userId })

    if (!task) {
      throw new GraphQLError("Task doesn't exist")
    }

    return task
  }

  throw new GraphQLError('Not Authorize')
}

export const updateTaskById = async ({
  ctx,
  payload,
  taskIdInput,
}: {
  ctx: IContextType
  payload: NexusGenInputs['TaskUpdateInput']
  taskIdInput: NexusGenInputs['GetTaskByIdInput']
}): Promise<NexusGenObjects['User'] | any> => {
  try {
    if (!ctx.user._id) {
      throw new GraphQLError('Unauthorized')
    }

    const { taskId } = taskIdInput

    const user = await Task.findById(taskId)

    if (!user) {
      throw new GraphQLError('No user found')
    }

    console.log(payload)
    const { ...data } = payload
    const taskUpdate = await Task.findByIdAndUpdate(
      taskId,
      { ...data },
      { new: true }
    )
    if (taskUpdate) return taskUpdate
  } catch (err: any) {
    throw new GraphQLError(err.message)
  }
}
