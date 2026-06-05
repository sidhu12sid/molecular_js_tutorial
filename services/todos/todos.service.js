const todoSchema = require("./todo.schema");
const ApiResponse = require("../../models/response.model");
const createDbMixin = require("../../mixins/db.mixins");

module.exports = {
  name: "todos",
  mixins: [createDbMixin("todos")],

  settings: {
    fields: ["_id", "taskName", "done", "createdAt", "updatedAt"],

    entityValidator: todoSchema,

    pageSize: 10,
    maxPageSize: 100,
  },

  actions: {
    async create(ctx) {
      createEntity = {
        ...ctx.params,
        done: false,
        createdAt: new Date(),
      }

      const doc = await this.adapter.insert(createEntity);
      const todo = await this.transformDocuments(ctx, {}, doc);
      return ApiResponse.success("Task added successfully", todo);
    },

    async list(ctx) {
      const page = Number(ctx.params.page) || 1;
      let pageSize = Number(ctx.params.pageSize) || this.settings.pageSize;
      pageSize = Math.min(pageSize, this.settings.maxPageSize);

      const query = ctx.params.query || {};
      const sort = ctx.params.sort || { createdAt: -1 };
      const offset = (page - 1) * pageSize;

      const docs = await this.adapter.find({ query, sort, limit: pageSize, offset });
      const total = await this.adapter.count(query);
      const todos = await this.transformDocuments(ctx, {}, docs);

      return ApiResponse.success("Tasks retrieved successfully", {
        items: todos,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      });
    },

    async view(ctx) {
      const id = ctx.params.id;
      const doc = await this.adapter.findById(id);
      const todo = await this.transformDocuments(ctx, {}, doc);
      return ApiResponse.success("Task retrieved successfully", todo);
    },

    async update(ctx) {
      const id = ctx.params.id;
      const updateData = {
        ...ctx.params,
        updatedAt: new Date(),
      };

      const doc = await this.adapter.updateById(id, { $set: updateData });
      const todo = await this.transformDocuments(ctx, {}, doc);
      return ApiResponse.success("Task updated successfully", todo);
    },

    async remove(ctx) {
      const id = ctx.params.id;
      await this.adapter.removeById(id);
      return ApiResponse.success("Task removed successfully", null);
    },

    async toggleDone(ctx) {
      const id = ctx.params.id;
      const doc = await this.adapter.findById(id);
      if (!doc) {
        throw new Error("Task not found");
      }
      const updatedDoc = await this.adapter.updateById(id, { $set: { done: !doc.done, updatedAt: new Date() } });
      const todo = await this.transformDocuments(ctx, {}, updatedDoc);
      return ApiResponse.success("Task status toggled successfully", todo);
    }

  }
}