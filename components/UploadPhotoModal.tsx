'use client';

import { useState } from 'react';
import PhotoForm from '@/components/PhotoForm';
import { Icon } from '@/components/Icon';

interface Props {
  selectedTripId: number;
}

export default function UploadPhotoModal({ selectedTripId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-primary-green flex items-center gap-2 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
      >
        <Icon name="camera" size={20} className="text-white" />
        Upload a photo
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Upload a photo</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-full p-2 text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>
            <PhotoForm selectedTripId={selectedTripId} onSuccess={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </>
  );
}
