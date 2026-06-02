module.exports = {
  nodeID: "todo-node-1",
  logger: {
    type: "Console",
    options: { colors: true, moduleColors: true }
  },
  transporter: "TCP",
  cacher: {
    type: "Memory",
    options: { ttl: 30 }
  },
  serializer: "JSON",
  requestTimeout: 10 * 1000,
  retryPolicy: {
    enabled: true,
    retries: 3,
    delay: 100,
  },
  circuitBreaker: {
    enabled: true,
    threshold: 0.5,
    minRequestCount: 20,
  }
};