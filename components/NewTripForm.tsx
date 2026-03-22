'use client';
import React, { useState } from 'react';
import {ProfilePicture} from '@components/ProfilePicture';
import { Country, User } from '@utils/types';

type Props = {
  countries: Country[];
  users: User[];
};

export default function NewTripForm({ countries, users }: Props) {
  const [countryCode, setCountryCode] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  function updateParticipants(personId: string) {
    setSelectedParticipants((prev) =>
      prev.includes(personId) ? prev.filter((id) => id !== personId) : [...prev, personId]
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ countryCode, description, date, selectedParticipants });
  };

  return (
    <div className="w-2/3">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 space-y-6"
      >
        <div>
          <label className="block font-semibold mb-1">Country</label>
          <select
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c.code} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description e.g. City/State"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Date</label>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold">Who went?</label>
          <p className="text-sm text-gray-500 mb-1">
            {selectedParticipants.length} people selected
          </p>
          <div className="flex flex-wrap gap-4">
            {users.map((user) => {
              const isSelected = selectedParticipants.includes(user.id);

              return (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => updateParticipants(user.id)}
                  className={`shadow rounded p-4 flex flex-col items-center gap-2 hover:cursor-pointer w-20 ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-white text-black'
                  }`}
                >
                  <ProfilePicture picUrl={user.picUrl} name={user.name} />
                  {user.name}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
}
