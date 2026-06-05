const todoSchema = {
  taskName: {
    type: "string",
    min:  1,
    max:  500
  },
  userId: {
    type: "string",
  },
  done: {
    type:     "boolean",
    optional: true,
    default:  false
  },
  createdAt: {
    type:     "date",
    optional: true,
  },
  updatedAt: {
    type:     "date",
    optional: true,
  }
};

module.exports = todoSchema;