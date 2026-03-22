import Link from 'next/link';
import { ProfilePicture } from '@components/ProfilePicture';
import { parseDecimal } from '@utils/functions';
import { getLeaderBoard} from '@db/queries'
import {LeaderboardEntry} from '@utils/types' 

export default async function Leaderboard() {
  let scores: LeaderboardEntry[] = [];

  scores = await getLeaderBoard()

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>

      {scores.length === 0 && <p className="text-gray-500 text-center">No scores available.</p>}

      <div className="flex flex-col gap-4">
        {scores.map((entry) => {
          return (
            <Link href={`/trip/${entry.tripId}`} key={entry.tripId}>
              <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between border border-gray-100 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://flagcdn.com/${entry?.country?.twoLetterCode}.svg`}
                    alt={`${entry?.country?.name} flag`}
                    className="w-10 h-7 rounded-sm shadow-md border border-gray-200 object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{entry?.country?.name}</span>
                    <span className="text-sm text-gray-500">
                      {entry?.date ? new Date(entry?.date).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {entry?.participants?.map((person) => (
                      <div key={person.id}>
                        <p>{person.name}</p>
                        <ProfilePicture picUrl={person.picUrl} name={person.name} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-right">
                  <div>
                    <p className="text-sm text-gray-500">Avg High</p>
                    <p className="font-bold">{entry?.avgHigh.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Avg Low</p>
                    <p className="font-bold">{entry?.avgLow?.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Diff</p>
                    <p className="font-bold">{entry?.avgDiff.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
