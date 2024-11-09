'use client';

import { useState } from 'react';
import { UploadSuccessModal } from './UploadSuccessModal';

interface Props {
  onUploadSuccess?: (file: { id: string; filename: string; url: string }) => void;
  // ... other props
}

export function FileUploadZone({ onUploadSuccess }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedFileId, setUploadedFileId] = useState('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('请上传PDF文件');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadProgress(100);
      setUploadedFileId(data.id);
      setShowSuccessModal(true);

      onUploadSuccess?.(data);
    } catch (error) {
      console.error('Upload error:', error);
      alert('上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto p-6">
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8
            flex flex-col items-center justify-center
            min-h-[300px] bg-white
            ${isDragging ? 'border-[#F97316]' : 'border-gray-300'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} id="fileInput" />

          <div className="text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">拖放PDF文件到这里或者</p>
            <label htmlFor="fileInput" className="cursor-pointer text-[#F97316] hover:text-[#EA580C]">
              点击上传
            </label>
            <button
              className="ml-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => {
                setUploadedFileId('test-file-id');
                setShowSuccessModal(true);
              }}>
              测试上传成功
            </button>
          </div>

          {isUploading && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                <div className="bg-[#F97316] h-1.5 rounded-full" style={{ width: `${uploadProgress}%` }} />
              </div>
              <div className="text-sm text-gray-500 text-right">{uploadProgress}%</div>
            </div>
          )}
        </div>
      </div>

      <UploadSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        fileId={uploadedFileId}
      />
    </>
  );
}
