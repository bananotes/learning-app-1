import Topic, { ITopic } from '@/app/models/Topic';
import { IChapter } from '@/app/models/Chapter';
import Sidebar from './components/Sidebar';
import CardSection from './components/CardSection';
import { notFound } from 'next/navigation';
import connect from '@/libs/mongodb';

interface ITopicWithChapters extends Omit<ITopic & { _id: string }, 'chapters'> {
  chapters: (IChapter & { _id: string })[];
}

async function getTopicWithChapters(id: string): Promise<ITopicWithChapters | null> {
  try {
    await connect();
    const topic = await Topic.findById(id).populate('chapters');
    if (!topic) notFound();
    return JSON.parse(JSON.stringify(topic));
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
}

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const topic = await getTopicWithChapters(id);

  const courseData = {
    id: topic!._id,
    name: topic!.name,
    chapters: topic!.chapters.map(chapter => ({
      id: chapter._id,
      name: chapter.name,
      cards: chapter.cards,
    })),
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar course={courseData} />

      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[#1A1C1E]">{topic!.name}</h1>
              <div className="flex gap-2">
                {/* TODO: Implement Add Card functionality in the future
                <button
                  className="px-4 py-2 text-sm bg-[#F97316] text-white rounded-lg 
                                 hover:bg-[#EA580C] transition-colors duration-200">
                  Add Card
                </button> */}
              </div>
            </div>
            <p className="text-gray-600 mt-2">{topic!.summary}</p>
          </div>

          {topic!.chapters.length > 0 ? (
            <CardSection cards={topic!.chapters[0].cards} />
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
