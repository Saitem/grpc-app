import mongoose from 'mongoose';

const { Schema } = mongoose;

interface User extends mongoose.Document {
  username: {
    type: string
  }
  password: {
    type: string
  }
}

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const User = mongoose.model<User>('User', schema);

export default User;