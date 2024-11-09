'use client';

import { useState } from 'react';

interface Chapter {
  id: string;
  name: string;
}

interface Course {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface SidebarProps {
  course: Course | null;
}

export default function Sidebar({ course }: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleEdit = async (chapterId: string, newName: string) => {
    try {
      // Check if new name is empty
      if (!newName.trim()) {
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // TODO: Replace with actual API call in production
      console.log(`Updating chapter ${chapterId} with new name: ${newName}`);

      setEditingId(null);
      // Add success notification or data refresh logic here
    } catch (error) {
      console.error('Error updating chapter name:', error);
      // Add error notification here
    }
  };

  // Show loading state if course is null
  if (!course) {
    return (
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-[#1A1C1E] mb-4">Course Chapters</h2>
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }

  const chapters = course.chapters || [];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold text-[#1A1C1E] mb-4">Course Chapters</h2>

      {/* Add Chapter Button */}
      <button
        className="w-full mb-4 px-4 py-2 text-sm text-[#F97316] border border-[#F97316] 
                   rounded-lg hover:bg-[#F97316]/5 transition-colors duration-200">
        + Add Chapter
      </button>

      {/* Chapter List */}
      {chapters.length === 0 ? (
        <div className="text-gray-500 text-sm">No chapters yet</div>
      ) : (
        <ul className="space-y-2">
          {chapters.map(chapter => (
            <li key={chapter.id} className="group">
              {editingId === chapter.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingName}
                    onChange={e => setEditingName(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg
                             focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316]"
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleEdit(chapter.id, editingName);
                      } else if (e.key === 'Escape') {
                        setEditingId(null);
                      }
                    }}
                  />
                  <button
                    onClick={() => handleEdit(chapter.id, editingName)}
                    className="text-sm text-[#F97316] hover:text-[#EA580C]">
                    Save
                  </button>
                </div>
              ) : (
                <div
                  className="flex items-center justify-between p-2 rounded-lg
                              hover:bg-gray-50 group-hover:bg-gray-50">
                  <span className="text-gray-700">{chapter.name}</span>
                  <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingId(chapter.id);
                        setEditingName(chapter.name);
                      }}
                      className="text-gray-400 hover:text-gray-600 
                               transition-colors duration-200">
                      Edit
                    </button>
                    <button
                      className="text-red-400 hover:text-red-600 
                               transition-colors duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
