const DbService = require("moleculer-db");
const MongoAdapter = require("moleculer-db-adapter-mongo");
const DbConfig = require("../config/db.config");

module.exports = function createDbMixin(collectionName) {
  return {
    mixins: [DbService],
    adapter: new MongoAdapter(DbConfig.uri, DbConfig.options),
    collection: collectionName,

    async afterConnected() {
      this.logger.info(`[DB] Connected → collection: ${this.collection}`);
    },

    async entityNotFound(id) {
      throw new MoleculerClientError(`${this.collection} not found: ${id}`, 404);
    }
  };
};