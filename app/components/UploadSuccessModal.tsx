'use client';

import { useState, useEffect } from 'react';

interface Chapter {
  id: string;
  name: string;
}

interface UploadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileId: string;
}

export function UploadSuccessModal({ isOpen, onClose, fileId }: UploadSuccessModalProps) {
  const [mode, setMode] = useState<'existing' | 'new'>('existing');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [newChapterName, setNewChapterName] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 获取现有章节列表
    const fetchChapters = async () => {
      try {
        const response = await fetch('/api/chapter');
        const data = await response.json();
        setChapters(data.chapters || []);
      } catch (error) {
        console.error('Failed to fetch chapters:', error);
        setChapters([]);
      }
    };

    if (isOpen) {
      fetchChapters();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (mode === 'existing') {
        // 添加到现有章节
        const response = await fetch(`/api/chapter/${selectedChapterId}/files`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileId }),
        });

        if (!response.ok) throw new Error('Failed to add file to chapter');
      } else {
        // 创建新章节并添加文件
        const response = await fetch('/api/chapter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newChapterName,
            fileId,
          }),
        });

        if (!response.ok) throw new Error('Failed to create chapter');
      }

      alert('操作成功！');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('操作失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
        {/* 模态框头部 */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#1A1C1E]">文件上传成功</h2>
          <p className="text-gray-600 text-sm mt-1">请选择添加到已有章节或创建新章节</p>
        </div>

        {/* 模态框内容 */}
        <div className="p-6 space-y-6">
          {/* 选择已有章节 */}
          <div className="space-y-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={mode === 'existing'}
                onChange={() => setMode('existing')}
                className="w-4 h-4 text-[#F97316] focus:ring-[#F97316] border-gray-300"
              />
              <span className="ml-2 text-[#1A1C1E] font-medium">添加到已有章节</span>
            </label>

            {mode === 'existing' && (
              <select
                value={selectedChapterId}
                onChange={e => setSelectedChapterId(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg
                         text-gray-700 text-sm focus:ring-2 focus:ring-[#F97316]/20 
                         focus:border-[#F97316] hover:border-[#F97316]
                         transition-colors duration-200">
                <option value="">选择章节...</option>
                {Array.isArray(chapters) &&
                  chapters.map(chapter => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.name}
                    </option>
                  ))}
              </select>
            )}
          </div>

          {/* 创建新章节 */}
          <div className="space-y-3">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={mode === 'new'}
                onChange={() => setMode('new')}
                className="w-4 h-4 text-[#F97316] focus:ring-[#F97316] border-gray-300"
              />
              <span className="ml-2 text-[#1A1C1E] font-medium">创建新章节</span>
            </label>

            {mode === 'new' && (
              <input
                type="text"
                value={newChapterName}
                onChange={e => setNewChapterName(e.target.value)}
                placeholder="输入章节名称"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg
                         text-gray-700 text-sm focus:ring-2 focus:ring-[#F97316]/20
                         focus:border-[#F97316] hover:border-[#F97316]
                         transition-colors duration-200"
              />
            )}
          </div>
        </div>

        {/* 模态框底部 */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm font-medium
                     hover:bg-gray-50 rounded-lg transition-colors duration-200"
            disabled={isSubmitting}>
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting || (mode === 'existing' && !selectedChapterId) || (mode === 'new' && !newChapterName)
            }
            className="px-4 py-2.5 bg-[#F97316] text-white rounded-lg text-sm font-medium
                     hover:bg-[#EA580C] transition-colors duration-200 shadow-sm
                     disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? '处理中...' : '确认'}
          </button>
        </div>
      </div>
    </div>
  );
}
