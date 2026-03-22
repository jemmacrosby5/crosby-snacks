import Link from 'next/link';
import { ProfilePicture } from '@components/ProfilePicture';
import { parseDecimal } from '@utils/functions';
import { getLeaderBoard } from '@db/queries'
import { LeaderboardEntry } from '@utils/types'

interface LeaderboardProps {
  limit?: number;
}

export default async function Leaderboard({ limit }: LeaderboardProps) {
  let scores: LeaderboardEntry[] = [];

  scores = await getLeaderBoard()

  if (limit) {
    scores = scores.slice(0, limit);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>

      {scores.length === 0 && <p className="text-gray-500 text-center">No scores available.</p>}

      <div className="flex flex-col gap-2">
        <div className="bg-slate-300 font-bold rounded-xl p-3 grid gap-4 items-center" style={{ gridTemplateColumns: '60px 1.5fr 1.5fr 1fr 1fr' }}>
          <p>Rank</p>
          <p>Trip</p>
          <p>People</p>
          <p>Scores(High/Low)</p>
          <p>Difference</p>
        </div>

        {scores.map((entry, index) => {
          return (
            <Link href={`/trip/${entry.tripId}`} key={entry.tripId}>
              <div className="bg-white shadow-md rounded-2xl px-4 py-8 grid gap-4 items-center border border-gray-100 hover:shadow-lg transition cursor-pointer" style={{ gridTemplateColumns: '60px 1.5fr 1.5fr 1fr 1fr' }}>
                {/* Rank */}
                <div className="flex justify-center">
                  <div className="rounded-full bg-slate-700 w-8 h-8 text-white text-center flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>

                {/* Trip */}
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://flagcdn.com/${entry?.country?.twoLetterCode}.svg`}
                    alt={`${entry?.country?.name} flag`}
                    className="w-10 h-7 rounded-sm shadow-md border border-gray-200 object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{entry?.country?.name}</span>
                    <span className="text-sm text-gray-500">
                      {entry?.date ? new Date(entry?.date).toLocaleDateString('en-GB') : ''}
                    </span>
                  </div>
                </div>

                {/* People */}
                <div className="flex items-center gap-2">
                  {entry?.participants?.map((person) => (
                    <div key={person.id} className="flex flex-col items-center">
                      <ProfilePicture picUrl={person.picUrl} name={person.name} />
                      <p className="text-xs mt-1">{person.name}</p>
                    </div>
                  ))}
                </div>

                {/* Scores */}
                <div className="text-center">
                  <p className="font-bold">{entry?.avgHigh.toFixed(2)} / {entry?.avgLow?.toFixed(2)}</p>
                </div>

                {/* Difference */}
                <div className="text-center">
                  <p className="font-bold">{entry?.avgDiff.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
