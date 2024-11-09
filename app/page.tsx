'use client';

import React from 'react';
import { CourseGrid } from './components/CourseGrid';
import { FileUploadZone } from './components/FileUploadZone';
import UserInfo from './components/UserInfo';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0F2F5]">
      {/* 顶部导航栏 */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1C1E]">PDF Processor</h1>
            <p className="text-gray-600 text-sm mt-1">轻松管理你的学习资料</p>
          </div>
          <UserInfo />
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-6 py-10">
        {/* 文件上传区域 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-[#1A1C1E]">上传新文件</h2>
          <FileUploadZone />
        </div>

        {/* 课程列表 */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-[#1A1C1E]">课程列表</h2>
          <CourseGrid />
        </div>
      </div>
    </main>
  );
}
