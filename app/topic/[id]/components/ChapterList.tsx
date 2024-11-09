'use client';

import { IChapter } from '@/app/models/Chapter';
import Link from 'next/link';

interface ChapterListProps {
  chapters: IChapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <Link
          key={chapter._id.toString()}
          href={`/chapter/${chapter._id.toString()}`}
          className="block p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">
                Chapter {index + 1}: {chapter.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{chapter.summary}</p>
            </div>
            <div className="text-sm text-gray-500">{chapter.cards.length} cards</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
