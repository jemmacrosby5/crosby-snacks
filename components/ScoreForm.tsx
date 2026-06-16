'use client';

import { FormEvent, useState } from 'react';

interface Props {
  selectedTripId: number;
  onSuccess?: () => void;
}

export default function ScoreForm({ selectedTripId, onSuccess }: Props) {
  const [highScore, setHighScore] = useState<number | ''>('');
  const [lowScore, setLowScore] = useState<number | ''>('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (highScore === '' || lowScore === '') {
      setError('Please enter both scores.');
      return;
    }

    if (highScore < 0 || highScore > 10 || lowScore < 0 || lowScore > 10) {
      setError('Scores must be between 0 and 10.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: selectedTripId,
          highScore,
          lowScore,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Unable to submit score.');
        return;
      }

      setSuccess(true);
      setHighScore('');
      setLowScore('');
      onSuccess?.();
    } catch (err) {
      setError('Unable to submit score. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-semibold mb-1">High Score</label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={highScore}
          onChange={(event) => {
            const value = event.target.value;
            if (value === '') {
              setHighScore('');
              return;
            }
            const numeric = Number(value);
            if (Number.isNaN(numeric)) {
              return;
            }
            setHighScore(Math.min(10, Math.max(0, Number(numeric.toFixed(2)))));
          }}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Low Score</label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          value={lowScore}
          onChange={(event) => {
            const value = event.target.value;
            if (value === '') {
              setLowScore('');
              return;
            }
            const numeric = Number(value);
            if (Number.isNaN(numeric)) {
              return;
            }
            setLowScore(Math.min(10, Math.max(0, Number(numeric.toFixed(2)))));
          }}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-green-600">Score submitted successfully!</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary-green cursor-pointer text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit score'}
      </button>
    </form>
  );
}
