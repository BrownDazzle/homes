'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

export const uploadPreset = "jxrisjxq";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  const handleUpload = useCallback((result: any) => {
    const newImageUrl = result.info.secure_url;
    onChange([...value, newImageUrl]);
  }, [onChange, value]);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 6
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus
              size={50}
            />
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            {value.length > 0 && (
              <div className="absolute inset-0 w-full h-full rounded-md grid grid-cols-3 gap-2">
                {value.map((src, index) => (
                  <div key={index} className="relative w-full h-full">
                    <Image
                      fill
                      style={{ objectFit: 'cover' }}
                      src={src}
                      alt={`House image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
