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
      name: '计算机网络基础',
      description: '深入学习计算机网络的基本概念、协议和应用',
      chaptersCount: 12,
      lastUpdated: '2024-03-11',
      color: 'bg-[#EEF2FF]',
    },
    {
      id: '2',
      name: '数据结构与算法',
      description: '掌握基础数据结构和常用算法的原理与实现',
      chaptersCount: 15,
      lastUpdated: '2024-03-10',
      color: 'bg-[#FEF3C7]',
    },
    {
      id: '3',
      name: '操作系统原理',
      description: '学习操作系统的核心概念和实现机制',
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
          {/* 课程头部 */}
          <div className={`h-36 rounded-t-xl ${course.color} p-6`}>
            <h3 className="text-lg font-semibold text-[#1A1C1E] mb-2">{course.name}</h3>
            <p className="text-gray-700 text-sm line-clamp-2">{course.description}</p>
          </div>

          {/* 课程信息 */}
          <div className="p-5 flex items-center justify-between text-sm border-t border-gray-100">
            <span className="flex items-center text-gray-600">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {course.chaptersCount} 章节
            </span>
            <span className="text-xs text-gray-500">更新于 {course.lastUpdated}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
