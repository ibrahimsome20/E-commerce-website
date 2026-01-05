const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to Mongo at:', process.env.URI_DB);
    const conn = await mongoose.connect(process.env.URI_DB, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Local MongoDB Connection Error: ${error.message}`);
    console.log('Falling back to In-Memory MongoDB...');

    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      console.log('In-Memory Mongo URI:', uri);

      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected (In-Memory): ${conn.connection.host}`);
    } catch (memError) {
      console.error(`In-Memory MongoDB Error: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
