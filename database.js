const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully !');
  } catch (error) {
    console.log('Database Connection: ', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
