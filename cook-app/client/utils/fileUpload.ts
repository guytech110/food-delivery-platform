import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

export interface UploadResult {
  success: boolean;
  url?: string;
  message: string;
}

export const uploadImage = async (
  file: File,
  folder: string = 'menu-items'
): Promise<UploadResult> => {
  try {
    // Create a unique filename to avoid conflicts
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      url: downloadURL,
      message: 'Image uploaded successfully'
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      message: 'Failed to upload image. Please try again.'
    };
  }
};

export const validateImageFile = (file: File): { isValid: boolean; message: string } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      message: 'Please select an image file (JPEG, PNG, etc.)'
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: 'Image size must be less than 5MB'
    };
  }

  return {
    isValid: true,
    message: 'File is valid'
  };
};
