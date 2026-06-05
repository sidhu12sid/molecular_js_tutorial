module.exports = {
  uri: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10,
  },
};