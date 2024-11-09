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

// Mock data
const mockCourse: Course = {
  id: '1',
  name: 'Artificial Intelligence Fundamentals',
  chapters: [
    { id: 'ch1', name: 'Chapter 1: Introduction to AI' },
    { id: 'ch2', name: 'Chapter 2: Machine Learning Basics' },
    { id: 'ch3', name: 'Chapter 3: Introduction to Deep Learning' },
    { id: 'ch4', name: 'Chapter 4: Neural Network Principles' },
    { id: 'ch5', name: 'Chapter 5: Computer Vision' },
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
    question: 'What is machine learning?',
    answer:
      'Machine learning is a subset of AI that enables computer systems to automatically improve their performance through experience',
  },
  {
    id: 'card5',
    question: 'What is the difference between deep learning and traditional machine learning?',
    answer:
      'Deep learning uses multi-layer neural networks to learn features automatically, while traditional machine learning usually requires manual feature engineering',
  },
];

export default function CoursePage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API request delay
    const fetchCourseData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Use mock data
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
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex">
      {/* Left sidebar */}
      <Sidebar course={course} />

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <CourseHeader course={course} />
          <CardSection cards={cards} />
        </div>
      </div>
    </div>
  );
}
