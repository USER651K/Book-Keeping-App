require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    // Using Promise-based API instead of callback
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('DB connected');
  } catch (error) {
    console.log('DB connection error:', error);
  }
};

module.exports = dbConnect;
