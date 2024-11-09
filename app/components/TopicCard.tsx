'use client';

import { useRouter } from 'next/navigation';
import { ITopic } from '../models/Topic';

interface TopicCardProps {
  topic: ITopic;
}

export function TopicCard({ topic }: TopicCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/topic/${topic._id.toString()}`);
  };

  // Format date consistently for both server and client
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // Will always output YYYY-MM-DD
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
      <p className="text-gray-600 mb-4">{topic.summary}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{topic.chapters.length} chapters</span>
        <span>Updated: {formatDate(topic.updatedAt)}</span>
      </div>
    </div>
  );
}
