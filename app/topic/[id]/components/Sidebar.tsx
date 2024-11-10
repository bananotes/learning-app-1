'use client';

import { useState, useRef } from 'react';
import ChapterList from './ChapterList';
import { useParams } from 'next/navigation';

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
  const { id: selectedTopicId } = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddChapter = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
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
      // Add to existing topic
      const updateResponse = await fetch(`/api/topic/${selectedTopicId}/chapter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      setIsUploading(false);
      if (!updateResponse.ok) throw new Error('Failed to add new chapter to topic');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    }

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsUploading(false);
    location.reload();
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
    <aside className="max-h-[calc(100vh-64px)] w-80 bg-white border-r border-gray-200 p-6 overflow-scroll">
      <div className="mb-8 text-center">
        {/* TODO: Add course name */}
        <p className="text-sm text-gray-600">
          {course.chapters.length} {course.chapters.length === 1 ? 'Chapter' : 'Chapters'}
        </p>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />

      <button
        onClick={handleAddChapter}
        disabled={isUploading}
        className={`w-full mb-4 px-4 py-2 text-sm border rounded-lg
    ${isUploading 
      ? 'text-gray-400 border-gray-400 cursor-not-allowed bg-gradient-to-r from-gray-100 to-gray-50 animate-pulse' 
      : 'text-[#F97316] border-[#F97316] hover:bg-[#F97316]/5 transition-colors duration-200'
    }`}
      >
        {isUploading ? 'Adding Chapter...' : '+ Add Chapter'}
      </button>

      <ChapterList
        chapters={course.chapters}
        selectedChapterId={selectedChapterId}
        onChapterSelect={onChapterSelect}
        onRename={handleRenameChapter}
        onDelete={handleDeleteChapter}
      />
    </aside>
  );
}
