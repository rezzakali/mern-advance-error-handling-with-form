// external imports
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Not a valid email address!');
      }
    },
  },
  phone: {
    type: String,
    min: 10,
    max: 10,
    validate: {
      validator: function (v) {
        return [/\d{3}-\d{3}-\d{4}/.test(v)];
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'phone number required!'],
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
    trim: true,
  },
  cPassword: {
    type: String,
    minLength: 6,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// hashing the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.cPassword = await bcrypt.hash(this.cPassword, 10);
  next();
});

// signed token
userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// reset password methods
userSchema.methods.resetPassword = function () {
  const resetToken = crypto.randomBytes(35).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

// model
const User = mongoose.model('User', userSchema);

export default User;
