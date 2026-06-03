require("dotenv").config();
const { ServiceBroker } = require("moleculer");
const brokerConfig = require("./moleculer.config");

const broker = new ServiceBroker(brokerConfig);

broker.loadService("./services/api.service");
// broker.loadService("./services/user.service");
broker.loadService('./services/todos.service');

broker.start()
  .then(() => broker.logger.info("🚀 Broker started"))
  .catch(err => broker.logger.error("Startup failed:", err));