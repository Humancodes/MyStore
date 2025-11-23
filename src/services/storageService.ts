import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { storage } from '@/lib/firebase';

export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

export class StorageService {
  static async uploadProductImage(
    file: File,
    sellerId: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string> {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `products/${sellerId}/${fileName}`;
      const storageRef = ref(storage, filePath);

      return new Promise((resolve, reject) => {
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.({
              progress,
              status: 'uploading',
            });
          },
          error => {
            console.error('Upload error:', error);
            onProgress?.({
              progress: 0,
              status: 'error',
              error: error.message,
            });
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              onProgress?.({
                progress: 100,
                status: 'success',
                url: downloadURL,
              });
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } catch (error: any) {
      console.error('Storage upload error:', error);
      const errorMessage = error?.message || 'Failed to upload image';

      if (
        errorMessage.includes('storage/retry-limit-exceeded') ||
        errorMessage.includes('CORS') ||
        errorMessage.includes('ERR_FAILED')
      ) {
        throw new Error(
          'Firebase Storage is not properly configured. Please enable Storage in Firebase Console and deploy storage rules.'
        );
      }

      throw error;
    }
  }

  static async uploadMultipleImages(
    files: File[],
    sellerId: string,
    onProgress?: (index: number, progress: UploadProgress) => void
  ): Promise<string[]> {
    const uploadPromises = files.map((file, index) =>
      this.uploadProductImage(file, sellerId, progress => {
        onProgress?.(index, progress);
      })
    );

    return Promise.all(uploadPromises);
  }

  static async deleteImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  static getImagePathFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const pathMatch = urlObj.pathname.match(/\/o\/(.+?)\?/);
      return pathMatch ? decodeURIComponent(pathMatch[1]) : null;
    } catch {
      return null;
    }
  }

  static validateImage(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.',
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size too large. Maximum size is 5MB.',
      };
    }

    return { valid: true };
  }
}
