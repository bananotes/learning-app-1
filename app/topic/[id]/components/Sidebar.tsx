'use client';

import { useState, useRef } from 'react';
import ChapterList from './ChapterList';
import { UploadSuccessModal } from '@/app/components/UploadSuccessModal';

interface Course {
  id: string;
  name: string;
  chapters: {
    id: string;
    name: string;
    cards: {
      id: string;
      question: string;
      answer: string;
    }[];
  }[];
}

export default function Sidebar({ course }: { course: Course }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddChapter = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadedFileId(data.fileId);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#1A1C1E] mb-2">{course.name}</h2>
        <p className="text-sm text-gray-600">
          {course.chapters.length} {course.chapters.length === 1 ? 'Chapter' : 'Chapters'}
        </p>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />

      <button
        onClick={handleAddChapter}
        className="w-full mb-4 px-4 py-2 text-sm text-[#F97316] border border-[#F97316] 
                   rounded-lg hover:bg-[#F97316]/5 transition-colors duration-200">
        + Add Chapter
      </button>

      <ChapterList chapters={course.chapters} />

      <UploadSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fileId={uploadedFileId} />
    </aside>
  );
}
