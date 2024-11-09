import mongoose from 'mongoose';

export interface IChapter {
  name: string;
  summary: string;
  topicId: mongoose.Types.ObjectId;
  cards: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  cards: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

export default mongoose.models.Chapter || mongoose.model<IChapter>('Chapter', chapterSchema);