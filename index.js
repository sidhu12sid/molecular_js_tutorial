require("dotenv").config();
const { ServiceBroker } = require("moleculer");
const brokerConfig = require("./moleculer.config");

const broker = new ServiceBroker(brokerConfig);

broker.loadServices("./services", "**/*.service.js");

broker.start()
  .then(() => broker.logger.info("🚀 Broker started"))
  .catch(err => broker.logger.error("Startup failed:", err));