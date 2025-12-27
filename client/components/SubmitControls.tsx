"use client"

import { useState } from "react";
import dynamic from "next/dynamic";

const NewTripForm = dynamic(() => import("@/components/NewTripForm"), {
  ssr: false,
  loading: () => <div>Loading form...</div>,
});

export default function SubmitControls({ userId }: { userId?: string }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex gap-4">
        <button
          onClick={() => setShowForm(true)}
          className="shadow rounded p-4 m-2 border cursor-pointer inline-block"
          type="button"
        >
          <h3>Create a new trip</h3>
        </button>

        <button className="shadow rounded p-4 m-2 border cursor-pointer inline-block" type="button">
          <h3>Submit a score</h3>
        </button>
      </div>

      {showForm && (
        <div>
          <NewTripForm onCancel={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
}
