'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import CardSection from './CardSection';

interface TopicContentProps {
  course: {
    id: string;
    name: string;
    summary: string;
    chapters: {
      id: string;
      name: string;
      summary: string;
      cards: {
        id: string;
        question: string;
        answer: string;
      }[];
    }[];
  };
}

export default function TopicContent({ course }: TopicContentProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(course.chapters[0]?.id || null);

  const selectedChapter = course.chapters.find(chapter => chapter.id === selectedChapterId);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar course={course} selectedChapterId={selectedChapterId} onChapterSelect={setSelectedChapterId} />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <div className="flex flex-col space-y-3">
              <p className="text-base text-gray-600 leading-relaxed max-w-3xl">{course.summary}</p>
            </div>
          </div>

          {selectedChapter ? (
            <CardSection cards={selectedChapter.cards} />
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
