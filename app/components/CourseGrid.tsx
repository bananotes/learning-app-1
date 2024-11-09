'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  id: string;
  name: string;
  description: string;
  chaptersCount: number;
  lastUpdated: string;
  color: string;
}

export function CourseGrid() {
  const router = useRouter();
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'Computer Networks Fundamentals',
      description: 'Deep dive into basic concepts, protocols, and applications of computer networks',
      chaptersCount: 12,
      lastUpdated: '2024-03-11',
      color: 'bg-[#EEF2FF]',
    },
    {
      id: '2',
      name: 'Data Structures and Algorithms',
      description: 'Master the principles and implementation of basic data structures and common algorithms',
      chaptersCount: 15,
      lastUpdated: '2024-03-10',
      color: 'bg-[#FEF3C7]',
    },
    {
      id: '3',
      name: 'Operating Systems Principles',
      description: 'Learn core concepts and implementation mechanisms of operating systems',
      chaptersCount: 10,
      lastUpdated: '2024-03-09',
      color: 'bg-[#ECFDF5]',
    },
  ]);

  const handleCourseClick = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <div
          key={course.id}
          onClick={() => handleCourseClick(course.id)}
          className="group bg-white rounded-xl transition-all duration-300
                   hover:shadow-lg hover:shadow-gray-200/80
                   border border-gray-200
                   cursor-pointer transform hover:-translate-y-1">
          {/* Course Header */}
          <div className={`h-36 rounded-t-xl ${course.color} p-6`}>
            <h3 className="text-lg font-semibold text-[#1A1C1E] mb-2">{course.name}</h3>
            <p className="text-gray-700 text-sm line-clamp-2">{course.description}</p>
          </div>

          {/* Course Info */}
          <div className="p-5 flex items-center justify-between text-sm border-t border-gray-100">
            <span className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {course.chaptersCount} Chapters
            </span>
            <span className="text-xs text-gray-500">Updated on {course.lastUpdated}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
