module.exports = {
    namespace: process.env.APP_NAMESPACE || "todo-app",
    nodeID: `${process.env.HOSTNAME || "node"}-${process.pid}`,

    logger: {
        type: "Console",
        options: { colors: true, moduleColors: true, formatter: "full" }
    },

    transporter: process.env.NATS_URL
        ? { type: "NATS", options: { url: process.env.NATS_URL } }
        : "TCP",

    cacher: process.env.REDIS_URL
        ? { type: "Redis", options: { redis: process.env.REDIS_URL, ttl: 30 } }
        : { type: "Memory", options: { ttl: 30 } },

    serializer: "JSON",
    requestTimeout: 10 * 1000,

    retryPolicy: {
        enabled: true,
        retries: 3,
        delay: 200,
        maxDelay: 1000,
        factor: 2,
        check: err => err && !!err.retryable,
    },

    circuitBreaker: {
        enabled: true,
        threshold: 0.5,
        windowTime: 60,
        minRequestCount: 20,
        halfOpenTime: 10 * 1000,
    },
    tracing: {
        enabled: process.env.TRACING_ENABLED === "true",
        exporter: "Console",
    },

    metrics: {
        enabled: process.env.METRICS_ENABLED === "true",
        reporter: { type: "Prometheus", options: { port: 3030 } }
    },

    stopped() {
        this.logger.info("Broker stopped. Cleaning up...");
    }
};