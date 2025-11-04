import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").order("asc").collect()
  },
})

export const get = query({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const order = (await ctx.db.query("todos").collect()).length
    const newTodo = await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      dueDate: args.dueDate,
      completed: false,
      order,
      createdAt: Date.now(),
    })
    return newTodo
  },
})

export const update = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    completed: v.optional(v.boolean()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args
    await ctx.db.patch(id, updates)
    return await ctx.db.get(id)
  },
})

export const toggleComplete = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id)
    if (!todo) throw new Error("Todo not found")
    await ctx.db.patch(args.id, { completed: !todo.completed })
    return await ctx.db.get(args.id)
  },
})

export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

export const updateOrder = mutation({
  args: { todos: v.array(v.object({ id: v.id("todos"), order: v.number() })) },
  handler: async (ctx, args) => {
    for (const todo of args.todos) {
      await ctx.db.patch(todo.id, { order: todo.order })
    }
  },
})
