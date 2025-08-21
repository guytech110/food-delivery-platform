import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../lib/firebase';

export interface UploadResult {
  success: boolean;
  url?: string;
  message: string;
}

const EXT_BY_MIME: Record<string, 'jpg' | 'png' | 'webp'> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export const uploadImage = async (
  file: File,
  folder: string = 'menu-items'
): Promise<UploadResult> => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      return { success: false, message: 'Please sign in to upload files.' };
    }

    // Create a unique filename with lowercase, rule-compliant extension
    const timestamp = Date.now();
    const baseName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.[^.]+$/, '');
    const ext = EXT_BY_MIME[file.type];
    const fileName = `${timestamp}_${baseName}.${ext ?? 'jpg'}`.toLowerCase();
    const storageRef = ref(storage, `uploads/${uid}/${folder}/${fileName}`);

    // Upload the file with contentType metadata to satisfy Storage rules
    const snapshot = await uploadBytes(storageRef, file, { contentType: file.type });

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      success: true,
      url: downloadURL,
      message: 'Image uploaded successfully'
    };
  } catch (error: any) {
    console.error('Error uploading image:', error);

    // Provide clearer messages for common Storage errors
    const code = error?.code as string | undefined;
    if (code === 'storage/unauthenticated') {
      return { success: false, message: 'Please sign in to upload images.' };
    }
    if (code === 'storage/unauthorized' || code === 'storage/permission-denied') {
      return {
        success: false,
        message: 'Upload not permitted. Ensure the image is JPG, PNG, or WEBP and under 5MB.'
      };
    }
    if (code === 'storage/canceled') {
      return { success: false, message: 'Upload canceled.' };
    }
    if (code === 'storage/retry-limit-exceeded') {
      return { success: false, message: 'Network issue uploading image. Please try again.' };
    }

    return {
      success: false,
      message: 'Failed to upload image. Please try again.'
    };
  }
};

export const validateImageFile = (file: File): { isValid: boolean; message: string } => {
  // Enforce allowed image types per Storage rules
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      message: 'Only JPG, PNG, or WEBP images are supported (max 5MB).'
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
