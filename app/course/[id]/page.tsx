'use client';

import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import CourseHeader from './components/CourseHeader';
import CardSection from './components/CardSection';

interface Course {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  name: string;
}

interface Card {
  id: string;
  question: string;
  answer: string;
}

// 模拟数据
const mockCourse: Course = {
  id: '1',
  name: '人工智能基础课程',
  chapters: [
    { id: 'ch1', name: '第一章：人工智能导论' },
    { id: 'ch2', name: '第二章：机器学习基础' },
    { id: 'ch3', name: '第三章：深度学习入门' },
    { id: 'ch4', name: '第四章：神经网络原理' },
    { id: 'ch5', name: '第五章：计算机视觉' },
  ],
};

const mockCards: Card[] = [
  {
    id: 'card1',
    question: 'What is an example of AI in streaming services?',
    answer: 'Recommendations on platforms like Netflix and Spotify',
  },
  {
    id: 'card2',
    question: 'What is an example of AI in drug development?',
    answer: 'Prediction models for Moderna vaccine design',
  },
  {
    id: 'card3',
    question: 'What do autonomous robots (AMRs) do?',
    answer: 'They navigate and adapt to their environments',
  },
  {
    id: 'card4',
    question: '什么是机器学习？',
    answer: '机器学习是人工智能的一个子领域，它使计算机系统能够通过经验自动改进其性能',
  },
  {
    id: 'card5',
    question: '深度学习与传统机器学习的区别是什么？',
    answer: '深度学习使用多层神经网络自动学习特征，而传统机器学习通常需要手动特征工程',
  },
];

export default function CoursePage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟 API 请求延迟
    const fetchCourseData = async () => {
      try {
        // 模拟 API 调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 使用模拟数据
        setCourse(mockCourse);
        setCards(mockCards);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex">
      {/* 左侧边栏 */}
      <Sidebar course={course} />

      {/* 主要内容区域 */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <CourseHeader course={course} />
          <CardSection cards={cards} />
        </div>
      </div>
    </div>
  );
}
