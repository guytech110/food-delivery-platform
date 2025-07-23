import React, { useRef, useState } from 'react';
import { uploadImage, validateImageFile } from '../utils/fileUpload';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
  selectedImage: File | null;
  imagePreview: string | null;
  isUploading: boolean;
  className?: string;
  height?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  onImageUpload,
  onImageRemove,
  selectedImage,
  imagePreview,
  isUploading,
  className = "w-full h-[242px]",
  height = "h-[242px]"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    onImageSelect(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    try {
      const result = await uploadImage(selectedImage, 'menu-items');
      
      if (result.success && result.url) {
        onImageUpload(result.url);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Failed to upload image');
    }
  };

  return (
    <div className={`${className} bg-[#f2f2f2] border border-[#e6e6e6] rounded-[10px] flex flex-col items-center justify-center gap-5 relative overflow-hidden`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      {imagePreview ? (
        <div className="relative w-full h-full">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onImageRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Uploading...</p>
              </div>
            </div>
          )}
          {selectedImage && !isUploading && (
            <button
              onClick={handleUpload}
              className="absolute bottom-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Upload
            </button>
          )}
        </div>
      ) : (
        <>
          <svg
            width="35"
            height="34"
            viewBox="0 0 35 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.4457 31.3042L21.8957 17.7042L28.6957 24.5042M7.4457 31.3042H24.4457C27.2624 31.3042 29.5457 29.0208 29.5457 26.2042V17.7042M7.4457 31.3042C4.62905 31.3042 2.3457 29.0208 2.3457 26.2042V9.20419C2.3457 6.38754 4.62905 4.10419 7.4457 4.10419H18.4957M27.8457 12.3125L27.8457 7.50419M27.8457 7.50419L27.8457 2.69586M27.8457 7.50419L23.0374 7.50419M27.8457 7.50419L32.654 7.50419M12.5457 11.7542C12.5457 13.1625 11.404 14.3042 9.9957 14.3042C8.58738 14.3042 7.4457 13.1625 7.4457 11.7542C7.4457 10.3459 8.58738 9.20419 9.9957 9.20419C11.404 9.20419 12.5457 10.3459 12.5457 11.7542Z"
              stroke="#61646B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-center">
            <p className="text-[#61646B] text-lg font-medium">Add Photo</p>
            <p className="text-[#61646B] text-sm">Upload a photo of your dish</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
