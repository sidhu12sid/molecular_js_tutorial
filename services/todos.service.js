const { ServiceBroker } = require("moleculer");
const DbMixin = require("moleculer-db");
const MongoAdapter = require("moleculer-db-adapter-mongo");
const todoSchema = require("../models/todo.schema");
const ApiResponse = require("../models/response.model");

module.exports = {
  name: "todos",

  mixins: [DbMixin],

  adapter: new MongoAdapter(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),

  collection: "todo-app",

  settings: {
    // fields to return in responses (whitelist)
    fields: ["_id", "taskName", "done", "createdAt", "updatedAt"],

    entityValidator: todoSchema,

    pageSize: 10,
    maxPageSize: 100,
  },

actions : {
    async create(ctx) {
        createEntity = {
            ...ctx.params,
            done:false,
            createdAt:new Date(),
        }

      const doc = await this.adapter.insert(createEntity);
      const todo = await this.transformDocuments(ctx, {}, doc);
      return ApiResponse.success("Task added successfully", todo);
    }
}

}