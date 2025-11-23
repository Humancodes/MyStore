'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { CloudinaryService } from '@/services/cloudinaryService';
import type { UploadProgress } from '@/services/cloudinaryService';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  sellerId: string;
  maxImages?: number;
  disabled?: boolean;
}

interface ImageWithProgress {
  url?: string;
  file?: File;
  progress: number;
  status: 'uploading' | 'success' | 'error' | 'idle';
  error?: string;
}

export default function ImageUpload({
  images,
  onChange,
  sellerId,
  maxImages = 5,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [imageStates, setImageStates] = useState<ImageWithProgress[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return;

      const remainingSlots = maxImages - images.length;
      const filesToUpload = acceptedFiles.slice(0, remainingSlots);

      if (filesToUpload.length === 0) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }

      const validFiles = filesToUpload.filter((file) => {
        const validation = CloudinaryService.validateImage(file);
        if (!validation.valid) {
          alert(`${file.name}: ${validation.error}`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      setUploading(true);

      const initialStates: ImageWithProgress[] = validFiles.map((file) => ({
        file,
        progress: 0,
        status: 'uploading' as const,
      }));
      setImageStates(initialStates);

      try {
        const uploadedUrls = await CloudinaryService.uploadMultipleImages(
          validFiles,
          `products/${sellerId}`,
          (index, progress) => {
            setImageStates((prev) => {
              const newStates = [...prev];
              newStates[index] = {
                ...newStates[index],
                progress: progress.progress,
                status: progress.status,
                url: progress.url,
                error: progress.error,
              };
              return newStates;
            });
          }
        );

        onChange([...images, ...uploadedUrls]);
        setImageStates([]);
      } catch (error) {
        console.error('Error uploading images:', error);
        alert('Failed to upload images. Please try again.');
      } finally {
        setUploading(false);
      }
    },
    [images, onChange, sellerId, maxImages, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: maxImages,
    disabled: disabled || uploading || images.length >= maxImages,
  });

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleReorderImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary/50',
            (disabled || uploading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            ) : (
              <Upload className="h-10 w-10 text-gray-400" />
            )}
            <div className="text-sm">
              {isDragActive ? (
                <p className="text-primary font-medium">Drop images here...</p>
              ) : (
                <>
                  <p className="font-medium text-gray-700">
                    Drag & drop images here, or click to select
                  </p>
                  <p className="text-gray-500 mt-1">
                    JPG, PNG, or WebP (max 5MB each)
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {images.length} / {maxImages} images uploaded
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {imageStates.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {imageStates.map((imageState, index) => (
            <Card key={index} className="p-2">
              <div className="space-y-2">
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {imageState.file && (
                    <Image
                      src={URL.createObjectURL(imageState.file)}
                      alt="Uploading"
                      fill
                      className="object-cover opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Uploading...</span>
                    <span className="font-medium">
                      {Math.round(imageState.progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all"
                      style={{ width: `${imageState.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="p-2 relative group">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                    Main
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {index > 0 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleReorderImage(index, 0)}
                      disabled={disabled}
                    >
                      Make Main
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveImage(index)}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && imageStates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}

