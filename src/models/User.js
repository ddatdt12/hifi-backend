const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateEmail } = require('../utils/validate');
const AppError = require('../utils/AppError');

const UserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    signInProvider: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: [validateEmail, 'Vui lòng nhập email hợp lệ'],
    },
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên'],
      maxlength: 30,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
