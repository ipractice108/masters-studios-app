'use client';
import { InputHTMLAttributes, forwardRef, useState, ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  preview?: boolean;
  onChange?: (file: File | null) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, label, error, helperText, preview = true, onChange, id, ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inputId = id || `file-${Math.random().toString(36).substr(2, 9)}`;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;

      if (file && preview && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }

      onChange?.(file);
    };

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type="file"
          onChange={handleFileChange}
          className={cn(
            'block w-full text-sm text-gray-500',
            'file:mr-4 file:py-2 file:px-4',
            'file:rounded-md file:border file:border-gray-300',
            'file:text-sm file:font-medium',
            'file:bg-white file:text-gray-700',
            'hover:file:bg-gray-50',
            'file:cursor-pointer cursor-pointer',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
        {previewUrl && (
          <div className="mt-3">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-md border border-gray-300"
            />
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
