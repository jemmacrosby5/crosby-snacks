'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { compressImage } from '@/utils/imageUtils';

interface Props {
  selectedTripId: number;
  onSuccess?: () => void;
}

export default function PhotoForm({ selectedTripId, onSuccess }: Props) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!file) {
      setError('Please choose a photo to upload.');
      return;
    }

    setSubmitting(true);

    try {
      const compressed = await compressImage(file);

      const formData = new FormData();
      formData.append('file', compressed, 'photo.webp');

      const res = await fetch(`/api/trips/${selectedTripId}/photos`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Unable to upload photo.');
        return;
      }

      setSuccess(true);
      setFile(null);
      router.refresh();
      onSuccess?.();
    } catch (err) {
      setError('Unable to upload photo. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold mb-1">Photo file</label>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>

      {previewUrl ? (
        <div className="rounded-md overflow-hidden border border-slate-200">
          <img src={previewUrl} alt="Photo preview" className="w-full object-cover max-h-72" />
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-600">Photo uploaded successfully!</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary-green cursor-pointer text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition disabled:opacity-50"
      >
        {submitting ? 'Uploading…' : 'Upload photo'}
      </button>
    </form>
  );
}
