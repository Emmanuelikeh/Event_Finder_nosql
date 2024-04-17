const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');

// UserID (Primary Key)
// Username 
// Email  (Unique)
// Password (Hashed using bcrypt)
// UserType (e.g.Organizer, Attendee)

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    indexL: true,
    validate: [isEmail, 'Invalid email'],
  },
  password: {
    type: String,
    required: true,
  },
  isorganizer: {
    type: Boolean,
    required: true,
  },

});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

userSchema.statics.getUserByCredentials = async function (email, password, isorganizer) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }
  if (user.isorganizer !== isorganizer) {
    throw new Error('User is not an organizer');
  }
  return user;
}

userSchema.methods.generateToken = function () {
  const user = this;
  return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
}

userSchema.statics.findOrganizers = async function () {
  return User.find({ isorganizer: true });
}



const User = mongoose.model('User', userSchema);
module.exports = User;


