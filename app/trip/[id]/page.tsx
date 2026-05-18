import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { ScoreCard } from '@/components/ScoreCard';
import { ProfilePicture } from '@/components/ProfilePicture';
import { getTripById } from '@db/queries';

interface TripPageProps {
  params: Promise<{
    id: string;
  }>;
}

const TripPage = async ({ params }: TripPageProps) => {
  const { id } = await params;

  const tripData = await getTripById(id);

  console.log(tripData);

  return (
    <div className="flex flex-col gap-4">
      {/* Details */}
      <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-2">
          <img
            src={`https://flagcdn.com/${tripData?.country?.twoLetterCode}.svg`}
            alt={`${tripData?.country?.name} flag`}
            className="w-12 h-8 rounded-md shadow-sm object-cover"
          />
          <h1 className="text-3xl font-bold">{tripData?.country?.name}</h1>
        </div>

        <div className="flex gap-2 mb-4 items-center">
          <Icon name="calendar" size={20} className="text-gray-600" />
          <p className="text-gray-500">
            {new Date(tripData?.date!).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {tripData?.description && <p className="text-gray-700 mb-2">{tripData.description}</p>}

        <div className="border border-gray-100 mb-2" />

        <div>
          <h3 className="text-sm font-semibold text-gray-500">Trip Participants</h3>
          <div className="flex flex-wrap gap-2">
            {tripData?.participants?.map((participant) => (
              <div key={participant.id} className="px-4 py-2 text-sm font-medium">
                <ProfilePicture picUrl={participant.pictureUrl} name={participant.name} />
                {participant.name}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 bg-gray-100 rounded divide-x divide-gray-300 p-2 justify-between">
          <div className="p-2 min-w-20 flex flex-col items-center text-blue-500 font-semibold">
            <p>Average High</p>
            <p className="text-xl">{tripData?.avgHigh}</p>
          </div>
          <div className="p-2 min-w-20 flex flex-col items-center text-red-500 font-semibold">
            <p>Average Low</p>
            <p className="text-xl">{tripData?.avgLow}</p>
          </div>
          <p>Diff: {tripData?.avgDiff}</p>
        </div>
      </div>

      {/* Scores */}
      <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Scores</h2>
        {tripData?.scores.length === 0 ? (
          <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-4">
            <p className="text-gray-600">No scores yet</p>
            <Link
              href="/submit/score"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit a score
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tripData?.scores.map((score) => {
              return <ScoreCard key={score.id} score={score} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPage;
