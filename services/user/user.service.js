const userSchema = require("./user.schema");
const ApiResponse = require("../../models/response.model");
const createDbMixin = require("../../mixins/db.mixins");

module.exports = {
  name: "users",
  mixins: [createDbMixin("users")],

  settings: {
    fields: ["_id", "firstName", "lastName", "email"],

    entityValidator: userSchema ,

    pageSize: 10,
    maxPageSize: 100,
  },

    actions: {
        async create(ctx) {
            try {
                if (ctx.params.password.length < 8) {
                    throw new MoleculerClientError("Password must be at least 8 characters", 400);
                }

                
            } catch (err) {
                this.logger.error(err);
                throw new ApiResponse(500, "Internal server error", err);
            }
        }
    }
  
}