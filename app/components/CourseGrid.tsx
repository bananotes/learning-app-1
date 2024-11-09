import mongoose from 'mongoose';
import TopicModel, { ITopic } from '../models/Topic';
import { TopicCard } from './TopicCard';

// Define the type for raw MongoDB documents
type RawTopic = {
  _id: mongoose.Types.ObjectId;
  name: string;
  summary: string;
  chapters: mongoose.Types.ObjectId[];
  authorId: mongoose.Types.ObjectId;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
};

async function getTopics() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    // 1. Force disconnect if connected
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    // 2. Create new connection
    await mongoose.connect(mongoUri!);

    // 3. Query with simplified options
    const rawTopics = (await TopicModel.find({})
      .sort({ updatedAt: -1 })
      .setOptions({
        cache: false,
        lean: true,
        maxTimeMS: 30000,
      })
      .select('-__v')
      .exec()) as RawTopic[];

    // 4. Transform data
    const topics: ITopic[] = rawTopics.map(topic => ({
      _id: topic._id,
      name: topic.name,
      summary: topic.summary,
      chapters: topic.chapters,
      authorId: topic.authorId,
      createdAt: new Date(topic.createdAt),
      updatedAt: new Date(topic.updatedAt),
    }));

    // 5. Disconnect after query
    await mongoose.disconnect();

    return topics;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}

// 移除 'use client' 指令，使其成为服务器组件
export async function CourseGrid() {
  try {
    const topics = await getTopics();

    if (!topics || topics.length === 0) {
      return (
        <div className="p-4 text-center">
          <p className="text-gray-500">No topics found in database</p>
        </div>
      );
    }

    return (
      <>
        <div className="mb-4">
          <p className="text-sm text-gray-600">Found {topics.length} topics</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map(topic => (
            <TopicCard key={topic._id.toString()} topic={topic} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error loading topics: {(error as Error).message}</p>
      </div>
    );
  }
}
