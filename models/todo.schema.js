const todoSchema = {
  taskName: {
    type: "string",
    min:  1,          // number not string
    max:  500         // number not string
  },
  userId: {
    type: "string",
  },
  done: {
    type:     "boolean",
    optional: true,   // boolean not string
    default:  false   // boolean not string
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