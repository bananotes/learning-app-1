'use client';

import { ITopic } from '@/app/models/Topic';
import { IChapter } from '@/app/models/Chapter';
import Sidebar from './components/Sidebar';
import CardSection from './components/CardSection';

interface TopicPageClientProps {
  topic: TopicWithChapters;
}

interface TopicWithChapters extends Omit<ITopic, 'chapters'> {
  chapters: IChapter[];
}

export default function TopicPageClient({ topic }: TopicPageClientProps) {
  const courseData = {
    id: topic._id.toString(),
    name: topic.name,
    chapters: topic.chapters.map(chapter => ({
      id: chapter._id.toString(),
      name: chapter.name,
    })),
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar course={courseData} />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[#1A1C1E]">{topic.name}</h1>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-sm bg-[#F97316] text-white rounded-lg 
                                 hover:bg-[#EA580C] transition-colors duration-200">
                  Add Card
                </button>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{topic.summary}</p>
          </div>

          {topic.chapters.length > 0 ? (
            <CardSection cards={topic.chapters[0].cards} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No cards available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
