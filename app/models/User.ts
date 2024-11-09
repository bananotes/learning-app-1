import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  topics: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);