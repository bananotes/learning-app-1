'use client';

import { useState, useRef } from 'react';
import ChapterList from './ChapterList';
import { UploadSuccessModal } from '@/app/components/UploadSuccessModal';
import { IChapter } from '@/app/models/Chapter';

interface Course {
  id: string;
  name: string;
  chapters: {
    id: string;
    name: string;
    summary: string;
    cards: {
      id: string;
      question: string;
      answer: string;
    }[];
  }[];
}

interface SidebarProps {
  course: Course;
  selectedChapterId: string | null;
  onChapterSelect: (chapterId: string | null) => void;
}

export default function Sidebar({ course, selectedChapterId, onChapterSelect }: SidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState<string>('');
  const [newChapterData, setNewChapterData] = useState<Pick<IChapter, 'name' | 'summary' | 'cards'>>();
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
      const response = await fetch('/api/import-ai', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadedFileId(data.fileId);
      setNewChapterData(data);
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

  const handleRenameChapter = async (chapterId: string, newName: string) => {
    try {
      const response = await fetch(`/api/chapters/${chapterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) throw new Error('Failed to rename chapter');

      // You'll need to implement a way to refresh the course data here
      // This could be through a router refresh or state management
    } catch (error) {
      console.error('Error renaming chapter:', error);
      alert('Failed to rename chapter. Please try again.');
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      const response = await fetch(`/api/chapters/${chapterId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete chapter');

      // You'll need to implement a way to refresh the course data here
      // This could be through a router refresh or state management
    } catch (error) {
      console.error('Error deleting chapter:', error);
      alert('Failed to delete chapter. Please try again.');
    }
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6">
      <div className="mb-8 text-center">
        {/* TODO: Add course name */}
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

      <ChapterList
        chapters={course.chapters}
        selectedChapterId={selectedChapterId}
        onChapterSelect={onChapterSelect}
        onRename={handleRenameChapter}
        onDelete={handleDeleteChapter}
      />

      <UploadSuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fileId={uploadedFileId} newChapterData={newChapterData} allowNewTopic={false} />
    </aside>
  );
}
