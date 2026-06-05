const ApiGateway = require("moleculer-web");

module.exports = {
  name: "api",
  mixins: [ApiGateway],

  settings: {
    port: process.env.PORT || 3000,

    routes: [
      {
        path: "/api",
        aliases: {
          "POST   /todos": "todos.create",
          "GET    /todos": "todos.list",
          "GET    /todos/:id":   "todos.get",
          "PUT    /todos/:id":   "todos.update",
          "DELETE /todos/:id":   "todos.remove",
          "PATCH  /todos/:id/toggle": "todos.toggleDone",
        },
        mappingPolicy: "restrict",
        bodyParsers: {
          json: true,
        },
        cors: {
          origin: "*",
          methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        }
      }
    ],

    // Global error handler
    onError(req, res, err) {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(err.code || 500);
      res.end(JSON.stringify({ error: err.message }));
    }
  }
};