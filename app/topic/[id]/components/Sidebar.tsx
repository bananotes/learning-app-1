'use client';

import { useState, useRef, useEffect } from 'react';
import ChapterList from './ChapterList';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [opacity, setOpacity] = useState(0.6); // 初始透明度为 0.6
  const [showLevelCard, setShowLevelCard] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollPosition = target.scrollTop;
      const maxScroll = target.scrollHeight - target.clientHeight;

      // 当滚动到底部时隐藏等级区域
      setShowLevelCard(scrollPosition < maxScroll - 10);

      // 计算透明度
      const newOpacity = Math.min(0.95, 0.6 + (scrollPosition / maxScroll) * 0.35);
      setOpacity(newOpacity);
    };

    // 初始化检查窗口大小
    handleResize();

    const sidebarElement = document.querySelector('.sidebar-container');
    sidebarElement?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      sidebarElement?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

      if (!updateResponse.ok) {
        throw new Error('Failed to add new chapter to topic');
      }

      toast({
        title: 'Success!',
        description: 'New chapter has been added to your topic.',
        variant: 'default',
        className: 'bg-[#F97316] text-white',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive',
        duration: 3000,
      });
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

      // 重新加载页面以获取最新数据
      location.reload();

      toast({
        title: 'Success!',
        description: 'Chapter name has been updated.',
        variant: 'default',
        className: 'bg-[#F97316] text-white',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error renaming chapter:', error);
      toast({
        title: 'Error',
        description: 'Failed to rename chapter. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      const response = await fetch(`/api/chapters/${chapterId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete chapter');

      // 重新加载页面以获取最新数据
      location.reload();

      toast({
        title: 'Success!',
        description: 'Chapter has been deleted.',
        variant: 'default',
        className: 'bg-[#F97316] text-white',
        duration: 3000,
      });
    } catch (error) {
      console.error('Error deleting chapter:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete chapter. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <aside
      className={`
        sidebar-container h-full bg-white border-r-2 border-gray-200/80 
        overflow-y-auto shadow-[inset_-1px_0_0_rgba(0,0,0,0.05)] flex flex-col relative
        ${isMobile ? 'w-[calc(100vw-32px)] max-w-[320px]' : 'w-80'}
      `}>
      <div className="flex-1 p-6 pb-32">
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-600">
            {course.chapters.length} {course.chapters.length === 1 ? 'Chapter' : 'Chapters'}
          </p>
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" className="hidden" />

        <button
          onClick={handleAddChapter}
          disabled={isUploading}
          className={`w-full mb-4 px-4 py-2 text-sm border rounded-lg
            ${
    isUploading
      ? 'text-gray-400 border-gray-400 cursor-not-allowed bg-gradient-to-r from-gray-100 to-gray-50 animate-pulse'
      : 'text-[#F97316] border-[#F97316] hover:bg-[#F97316]/5 transition-colors duration-200'
    }`}>
          {isUploading ? 'Adding Chapter...' : '+ Add Chapter'}
        </button>

        <ChapterList
          chapters={course.chapters}
          selectedChapterId={selectedChapterId}
          onChapterSelect={onChapterSelect}
          onRename={handleRenameChapter}
          onDelete={handleDeleteChapter}
        />
      </div>

      {showLevelCard && (
        <div
          className={`
            fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-72 rounded-2xl 
            shadow-lg border border-gray-200/50 p-4
            transition-all duration-500 ease-in-out backdrop-blur-sm
            ${isMobile ? '' : 'md:left-[160px]'}
            transform-gpu
            ${
        showLevelCard
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }
          `}
          style={{
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            transformOrigin: 'bottom',
          }}>
          <div
            className={`
              flex items-center gap-3 p-3 bg-white/80 rounded-xl border border-gray-100 shadow-sm
              transition-all duration-500 ease-out
              ${showLevelCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              delay-100
            `}>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">Lvl 1: Noob</h3>
              <p className="text-xs text-gray-500">Keep learning to level up!</p>
            </div>
          </div>

          <div className="mt-3 space-y-1.5 p-3 bg-white/80 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center text-xs text-gray-600">
              <span>Experience</span>
              <span>0 / 50 XP</span>
            </div>
            <div className="w-full bg-gray-200/70 rounded-lg h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-lg transition-all duration-300 ease-out"
                style={{ width: `${(0 / 50) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
