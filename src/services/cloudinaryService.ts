export interface UploadProgress {
  progress: number;
  status: 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

export class CloudinaryService {
  private static cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  private static uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

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

  static async uploadImage(
    file: File,
    folder: string = 'products',
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string> {
    if (!this.cloudName || !this.uploadPreset) {
      throw new Error(
        'Cloudinary is not configured. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to your .env.local file.'
      );
    }

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset!);
      formData.append('folder', folder);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          onProgress?.({
            progress,
            status: 'uploading',
          });
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            const imageUrl = response.secure_url;
            onProgress?.({
              progress: 100,
              status: 'success',
              url: imageUrl,
            });
            resolve(imageUrl);
          } catch (error) {
            const errorMessage = 'Failed to parse upload response';
            onProgress?.({
              progress: 0,
              status: 'error',
              error: errorMessage,
            });
            reject(new Error(errorMessage));
          }
        } else {
          const errorMessage = `Upload failed with status ${xhr.status}`;
          onProgress?.({
            progress: 0,
            status: 'error',
            error: errorMessage,
          });
          reject(new Error(errorMessage));
        }
      });

      xhr.addEventListener('error', () => {
        const errorMessage = 'Network error during upload';
        onProgress?.({
          progress: 0,
          status: 'error',
          error: errorMessage,
        });
        reject(new Error(errorMessage));
      });

      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`
      );
      xhr.send(formData);
    });
  }

  static async uploadMultipleImages(
    files: File[],
    folder: string = 'products',
    onProgress?: (index: number, progress: UploadProgress) => void
  ): Promise<string[]> {
    const uploadPromises = files.map((file, index) =>
      this.uploadImage(file, folder, (progress) => {
        onProgress?.(index, progress);
      })
    );

    return Promise.all(uploadPromises);
  }

  static getImageUrl(publicId: string, transformations?: string): string {
    if (!this.cloudName) {
      return '';
    }
    const baseUrl = `https://res.cloudinary.com/${this.cloudName}/image/upload`;
    const transform = transformations ? `${transformations}/` : '';
    return `${baseUrl}/${transform}${publicId}`;
  }
}

