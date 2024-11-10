import TopicModel from '../models/Topic';
import { TopicCard } from './TopicCard';
import connect from '@/libs/mongodb';

async function getTopics() {
  try {
    await connect();
    const topics = await TopicModel.find({}).lean();

    return topics.map(topic => JSON.parse(JSON.stringify(topic)));
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
            <TopicCard key={topic._id as string} topic={topic} />
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
