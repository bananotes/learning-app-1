import mongoose from 'mongoose';
import TopicModel, { ITopic } from '@/app/models/Topic';
import ChapterModel, { IChapter } from '@/app/models/Chapter';
import { notFound } from 'next/navigation';
import TopicPageClient from './TopicPageClient';

interface PageProps {
  params: {
    id: string;
  };
}

// MongoDB document base type
interface MongoDocument {
  _id: mongoose.Types.ObjectId;
  __v: number;
}

// Raw MongoDB document types
type RawChapter = MongoDocument & {
  name: string;
  summary: string;
  topicId: mongoose.Types.ObjectId;
  cards: {
    id: string;
    question: string;
    answer: string;
  }[];
  createdAt: string | Date;
  updatedAt: string | Date;
};

type RawTopic = MongoDocument & {
  name: string;
  summary: string;
  chapters: mongoose.Types.ObjectId[];
  authorId: mongoose.Types.ObjectId;
  createdAt: string | Date;
  updatedAt: string | Date;
};

// 添加 TopicWithChapters 接口定义
interface TopicWithChapters extends Omit<ITopic, 'chapters'> {
  chapters: IChapter[];
}

interface SerializedChapter {
  _id: string;
  name: string;
  summary: string;
  topicId: string;
  cards: {
    id: string;
    question: string;
    answer: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface SerializedTopic {
  _id: string;
  name: string;
  summary: string;
  authorId: string;
  chapters: SerializedChapter[];
  createdAt: string;
  updatedAt: string;
}

async function getTopicWithChapters(id: string): Promise<SerializedTopic | null> {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGODB_URI!);

    const rawTopic = (await TopicModel.findById(id).lean().exec()) as unknown as RawTopic;

    if (!rawTopic) return null;

    const rawChapters = (await ChapterModel.find({
      _id: { $in: rawTopic.chapters },
    })
      .lean()
      .exec()) as unknown as RawChapter[];

    // Serialize all MongoDB objects to plain objects
    const serializedTopic: SerializedTopic = {
      _id: rawTopic._id.toString(),
      name: rawTopic.name,
      summary: rawTopic.summary,
      authorId: rawTopic.authorId.toString(),
      chapters: rawChapters.map(chapter => ({
        _id: chapter._id.toString(),
        name: chapter.name,
        summary: chapter.summary,
        topicId: chapter.topicId.toString(),
        cards: chapter.cards || [],
        createdAt: new Date(chapter.createdAt).toISOString(),
        updatedAt: new Date(chapter.updatedAt).toISOString(),
      })),
      createdAt: new Date(rawTopic.createdAt).toISOString(),
      updatedAt: new Date(rawTopic.updatedAt).toISOString(),
    };

    await mongoose.disconnect();
    return serializedTopic;
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
}

export default async function TopicPageServer({ params }: PageProps) {
  const serializedTopic = await getTopicWithChapters(params.id);

  if (!serializedTopic) {
    notFound();
  }

  // 将序列化的数据转换为客户端需要的格式
  const clientTopic: TopicWithChapters = {
    _id: new mongoose.Types.ObjectId(serializedTopic._id),
    name: serializedTopic.name,
    summary: serializedTopic.summary,
    authorId: new mongoose.Types.ObjectId(serializedTopic.authorId),
    chapters: serializedTopic.chapters.map(chapter => ({
      _id: new mongoose.Types.ObjectId(chapter._id),
      name: chapter.name,
      summary: chapter.summary,
      topicId: new mongoose.Types.ObjectId(chapter.topicId),
      cards: chapter.cards,
      createdAt: new Date(chapter.createdAt),
      updatedAt: new Date(chapter.updatedAt),
    })),
    createdAt: new Date(serializedTopic.createdAt),
    updatedAt: new Date(serializedTopic.updatedAt),
  };

  return <TopicPageClient topic={clientTopic} />;
}
