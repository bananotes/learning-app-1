import React from 'react';
import { CourseGrid } from './components/CourseGrid';
import { FileUploadZone } from './components/FileUploadZone';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0F2F5]">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1C1E]">PDF Processor</h1>
            <p className="text-gray-600 text-sm mt-1">Easily manage your study materials</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-10">
        {/* File Upload Area */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-[#1A1C1E]">Upload New File</h2>
          <FileUploadZone />
        </div>

        {/* Course List */}
        <div>
          <h2 className="text-xl font-semibold mb-6 text-[#1A1C1E]">Course List</h2>
          <CourseGrid />
        </div>
      </div>
    </main>
  );
}
