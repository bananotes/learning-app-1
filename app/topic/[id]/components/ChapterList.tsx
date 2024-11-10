'use client';

import Link from 'next/link';

interface Chapter {
  id: string;
  name: string;
  cards: {
    id: string;
    question: string;
    answer: string;
  }[];
}

interface ChapterListProps {
  chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
  return (
    <nav className="space-y-2">
      {chapters.map(chapter => (
        <Link
          key={chapter.id}
          href={`/chapter/${chapter.id}`}
          className="block p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1A1C1E]">{chapter.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {chapter.cards.length} {chapter.cards.length === 1 ? 'card' : 'cards'}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </nav>
  );
}
