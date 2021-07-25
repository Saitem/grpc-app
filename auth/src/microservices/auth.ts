import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

dotenv.config()

export const signIn = async (call, callback) => {
  const { username, password } = call.request;
  
  const user = await User.findOne({ username });

  if(!user) {
    return callback(null, { success: false, message: 'USERNAME_DOES_NOT_EXIST' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return callback(null, { success: false, message: 'INVALID_PASSWORD' });
  }

  try {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    callback(null, { success: true, token });
  } catch(err) {
    callback(null, { success: false, message: 'SOMETHING_WENT_WRONG' });
  }
}

export const signUp = async (call, callback) => {
  const { username, password } = call.request;

  const checkUser = await User.findOne({ username });

  if(checkUser) {
    callback(null, { success: false, message: 'USERNAME_ALREADY_EXIST' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    username, 
    password: hashedPassword
  });

  try {
    const newUser = await user.save();
    callback(null, { success: true, _id: newUser._id, username: newUser.username });
  } catch(err) {
    callback(null, { success: false, message: 'SOMETHING_WENT_WRONG' });
  }
}
