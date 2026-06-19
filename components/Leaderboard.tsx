import Link from 'next/link';
import Score from '@components/Score';
import { ProfilePicture } from '@components/ProfilePicture';
import { getLeaderBoard } from '@db/queries';
import { LeaderboardEntry } from '@utils/types';
import { Icon } from './Icon';

interface LeaderboardProps {
  limit?: number;
}

export default async function Leaderboard({ limit }: LeaderboardProps) {
  const scores: LeaderboardEntry[] = await getLeaderBoard(limit);

  return (
    <div className="max-w-3xl mx-auto">
      {scores.length === 0 && <p className="text-gray-500 text-center">No scores available.</p>}

      <div className="flex flex-col gap-2">
        {scores.map((entry, index) => {
          return (
            <Link href={`/trip/${entry.tripId}`} key={entry.tripId}>
              {/* Desktop Layout */}
              <div
                className="bg-white shadow-md hidden rounded-2xl px-4 py-8 md:grid gap-4 items-center border border-gray-100 hover:shadow-lg transition cursor-pointer"
                style={{ gridTemplateColumns: '60px 1.5fr 1.5fr 1fr 1fr' }}
              >
                {/* Rank */}
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary-green w-8 h-8 text-white text-center flex items-center justify-center">
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
                      <ProfilePicture picUrl={person.pictureUrl} name={person.name} />
                      <p className="text-xs mt-1">{person.name}</p>
                    </div>
                  ))}
                </div>

                {/* Scores */}
                <Score highScore={entry?.avgHigh} lowScore={entry?.avgLow} />

                {/* Difference */}
                <div className="text-center">
                  <p className="font-bold text-lg">{entry?.avgDiff.toFixed(2)}</p>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="bg-white shadow-md flex rounded-2xl p-4 md:hidden gap-4 items-center border border-gray-100 hover:shadow-lg transition cursor-pointer">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-start gap-4">
                    {/* Rank */}
                    <div className="flex justify-center">
                      <div className="rounded-full bg-slate-700 w-8 h-8 text-white text-center flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {/* Trip Info */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://flagcdn.com/${entry?.country?.twoLetterCode}.svg`}
                            alt={`${entry?.country?.name} flag`}
                            className="w-8 h-5 rounded-sm shadow-md border border-gray-200 object-cover"
                          />
                          <span className="text-lg font-semibold ">{entry?.country?.name}</span>
                        </div>

                        <span className="text-sm text-gray-500">
                          {entry?.date ? new Date(entry?.date).toLocaleDateString('en-GB') : ''}
                        </span>
                      </div>

                      {/* People */}
                      <div className="flex items-center gap-2">
                        <Icon name="users" />
                        <p className="text-sm text-gray-600">
                          {entry?.participants?.map((person) => person.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="text-center mr-2">
                    <p className="font-bold text-xl">{entry?.avgDiff.toFixed(2)}</p>
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
