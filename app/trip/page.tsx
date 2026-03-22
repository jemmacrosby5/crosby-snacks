import { parseDecimal } from '@utils/functions';
import Link from 'next/link';
import { ProfilePicture } from '@components/ProfilePicture';
import { LeaderboardEntry } from '@/utils/types';
import { getLeaderBoard} from '@db/queries'

const TripHomePage = async () => {
  const trips: LeaderboardEntry[] = await getLeaderBoard();

  return (
    <div>
      <h2 className="text-3xl font-bold p-4">All Trips</h2>
      <div className="flex flex-col gap-4 p-6">
        {trips.map((entry: LeaderboardEntry) => {
          const id = entry.tripId
          const countryName = entry.country?.name ?? 'Unknown';
          const countryCode = (entry.country?.code).toLowerCase() ?? '';
          const avgHigh = parseDecimal(entry.avgHigh);
          const avgLow = parseDecimal(entry.avgLow);
          const avgDiff = avgHigh - avgLow;

          return (
            <Link href={`/trip/${id}`} key={id}>
              <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between border border-gray-100 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://flagcdn.com/${countryCode}.svg`}
                    alt={`${countryName} flag`}
                    className="w-10 h-7 rounded-sm shadow-md border border-gray-200 object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">{countryName}</span>
                    <span className="text-sm text-gray-500">
                      {entry.date ? new Date(entry.date).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {entry.participants?.map((p) => (
                      <div key={p.id}>
                        <p>{p.name}</p>
                        <ProfilePicture picUrl={p.picUrl} name={p.name} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-right">
                  <div>
                    <p className="text-sm text-gray-500">Avg High</p>
                    <p className="font-bold">{isNaN(avgHigh) ? '-' : avgHigh.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Avg Low</p>
                    <p className="font-bold">{isNaN(avgLow) ? '-' : avgLow.toFixed(2)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Diff</p>
                    <p className="font-bold">{isNaN(avgDiff) ? '-' : avgDiff.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TripHomePage;
