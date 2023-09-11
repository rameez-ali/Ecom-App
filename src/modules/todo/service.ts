import { GraphQLError } from 'graphql'
import Todo, { ITodo, ITodoDocument } from './model'
import { NexusGenInputs, NexusGenObjects } from 'nexus-typegen'
import { IContextType } from '../../types'
import { FilterQuery } from 'mongoose'
import {
  generateOTP,
  getPaginator,
  objectSanitizer,
} from '../../utils/common.utils'

export const getTodos = async (
  ctx: IContextType,
  paginator: NexusGenInputs['PaginatorFilterInput']
): Promise<NexusGenObjects['TodoPaginator']> => {
  const userId = ctx.user._id
  console.log(userId)
  const todos = await Todo.find({userId:userId}).populate("tasks")

  if (!todos) {
    throw new GraphQLError("Todo doesn't exist")
  }

  return {
    data: todos,
  }
}


export const addTodo = async ({
  ctx,
  payload,
}: {
  ctx: IContextType
  payload: NexusGenInputs['TodoAdditionInput']
}): Promise<NexusGenObjects['User'] | any> => {

  const userId = ctx.user._id

  const { content, dueDate, done } = payload

  const createdTodo = await Todo.create({
    content,
    dueDate,
    done,
    userId
  })

  return createdTodo
  }

export const getTodo = async (
  ctx: IContextType
): Promise<NexusGenObjects['Todo']> => {
  try {
    const userId = ctx?.user?._id
    if (!userId) {
      throw new GraphQLError('Not Authorize')
    }

    const user = await Todo.findOne({ _id: userId })

    if (!user) {
      throw new GraphQLError("User doesn't exist")
    }

    return user
  } catch (err) {
    throw new GraphQLError(err.message)
  }
}

export const getTodoById = async (
  ctx: IContextType,
  payload: NexusGenInputs['GetTodoByIdInput']
): Promise<NexusGenObjects['User']> => {
  if (ctx.user) {
    const id = ctx.user._id
    if (!id) {
      throw new GraphQLError('Not Authorize')
    }

    const user = await Todo.findOne({ _id: payload.todoId })

    if (!user) {
      throw new GraphQLError("Todo doesn't exist")
    }

    return user
  }

  throw new GraphQLError('Not Authorize')
}


export const deleteTodoById = async (
  ctx: IContextType,
  payload: NexusGenInputs['GetTodoByIdInput']
): Promise<NexusGenObjects['User']> => {
  if (ctx.user) {
    const id = ctx.user._id
    if (!id) {
      throw new GraphQLError('Not Authorize')
    }

    const todo = await Todo.findOne({ _id: payload.todoId })

    if (!todo) {
      throw new GraphQLError("Todo doesn't exist")
    }

    if (todo.tasks.length > 0 ) {
      throw new GraphQLError("You can't delete this todo because it contains tasks")
    }
    else{
      const todo = await Todo.findByIdAndDelete({ _id: payload.todoId });
      return todo
    }

  }

  throw new GraphQLError('Not Authorize')
}

export const updateTodoById = async ({
  ctx,
  payload,
  todoIdInput,
}: {
  ctx: IContextType
  payload: NexusGenInputs['TodoUpdateInput']
  todoIdInput: NexusGenInputs['GetTodoByIdInput']
}): Promise<NexusGenObjects['User'] | any> => {
  try {
  
    const { todoId } = todoIdInput

    const todocheck = await Todo.findById(todoId)

    console.log(todocheck);

    if (todocheck.userId != ctx.user._id) {
      throw new GraphQLError('You are not Unauthorized')
    }

    if (!todocheck) {
      throw new GraphQLError('No todo found')
    }

    console.log(payload)
    const { ...data } = payload
    const todoUpdate = await Todo.findByIdAndUpdate(
      todoId,
      { ...data },
      { new: true }
    )

    if (todoUpdate) return todoUpdate
  } catch (err: any) {
    throw new GraphQLError(err.message)
  }
}
