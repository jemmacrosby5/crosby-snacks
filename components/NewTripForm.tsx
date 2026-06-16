'use client';
import React, { useState } from 'react';
import { ProfilePicture } from '@components/ProfilePicture';
import { Country, User } from '@utils/types';
import { createTripAction } from '@/app/actions/createTrip';

type Props = {
  countries: Country[];
  users: User[];
};

export default function NewTripForm({ countries, users }: Props) {
  const [countryId, setCountryId] = useState<number>();
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  function updateParticipants(personId: string) {
    setSelectedParticipants((prev) =>
      prev.includes(personId) ? prev.filter((id) => id !== personId) : [...prev, personId]
    );
  }

  return (
    <div>
      <form
        action={createTripAction}
        className="w-full max-w-xl bg-white rounded-xl shadow-md p-8 space-y-6"
      >
        <div>
          <label className="block font-semibold mb-1">Country</label>
          <select
            name="countryId"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={countryId}
            onChange={(e) => setCountryId(Number(e.target.value))}
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
            name="description"
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
            name="date"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col items-center">
          <label className="block font-semibold">Who went?</label>
          <p className="text-sm text-gray-500 mb-1">
            {selectedParticipants.length} people selected
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
            {users.map((user) => {
              const isSelected = selectedParticipants.includes(user.id);
              return (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => updateParticipants(user.id)}
                  className={`shadow rounded p-4 flex flex-col items-center gap-2 hover:cursor-pointer w-20 ${
                    isSelected ? 'bg-slate-600 text-white' : 'bg-white text-black'
                  }`}
                >
                  <ProfilePicture picUrl={user?.pictureUrl} name={user.name} />
                  {user.name}
                </button>
              );
            })}
            {/* Hidden inputs for selected participants */}
            {selectedParticipants.map((id) => (
              <input key={id} type="hidden" name="participants" value={id} />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary-green text-white rounded-md px-6 py-2 self-center cursor-pointer"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
}
