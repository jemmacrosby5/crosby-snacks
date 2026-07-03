import { Icon } from '@/components/Icon';
import { ScoreCard } from '@/components/ScoreCard';
import { ProfilePicture } from '@/components/ProfilePicture';
import LinkButton from '@/components/LinkButton';
import ScoreFormModal from '@/components/ScoreFormModal';
import LoginCTA from '@/components/LoginCTA';

import { getTripById } from '@db/queries';
import { auth } from '@clerk/nextjs/server';

interface TripPageProps {
  params: Promise<{
    id: string;
  }>;
}

const TripPage = async ({ params }: TripPageProps) => {
  const { isAuthenticated } = await auth();

  const { id } = await params;
  const tripData = await getTripById(id);
  const hasPhotos = !!tripData?.photos;

  if (!tripData) {
    return (
      <div className="bg-white rounded-2xl p-8 text-gray-600 flex flex-col gap-4">
        Uh oh, we couldn't find that trip.
        <div className="flex gap-4">
          <LinkButton type="primary" link="/" label="Back Home" customClass="w-fit" />
          <LinkButton type="secondary" link="/trip" label="Back to Trips" customClass="w-fit" />
        </div>
      </div>
    );
  }

  const avgHigh = Number(tripData.avgHigh ?? 0).toFixed(2);
  const avgLow = Number(tripData.avgLow ?? 0).toFixed(2);
  const avgDiff = Number(tripData.avgDiff ?? 0).toFixed(2);

  return (
    <div className="flex flex-col gap-4">
      {/* Trip Details */}
      <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8 gap-4 flex md:flex-row flex-col md:items-center md:justify-between">
        <div>
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

          <div className="flex flex-wrap gap-4">
            {tripData?.participants?.map((participant) => (
              <div
                key={participant.id}
                className="py-2 text-sm font-medium flex flex-col items-center"
              >
                <ProfilePicture picUrl={participant.pictureUrl} name={participant.name} />
                {participant.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-8 md:flex-row flex-col md:items-center">
          <div className="grid grid-cols-2 bg-primary-blue rounded divide-x divide-gray-300 p-2 h-fit justify-between">
            <div className="p-2 min-w-20 flex flex-col gap-1 items-center">
              <Icon name="arrowUp" />
              <p>Average High</p>
              <p className="text-xl font-bold">{avgHigh}</p>
            </div>
            <div className="p-2 min-w-20 flex flex-col gap-1 items-center">
              <Icon name="arrowDown" />
              <p>Average Low</p>
              <p className="text-xl font-bold">{avgLow}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 px-6">
            <div className="bg-primary-green rounded-full w-fit p-1">
              <Icon name="star" className="text-white font-bold" />
            </div>
            <div className="flex flex-col items-center">
              <p>Overall Score</p>
              <p className="font-bold text-xl">{avgDiff}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scores */}
      <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-1">Scores</h2>
        <div aria-hidden className="bg-primary-green h-1 w-10 mb-2"></div>

        {tripData.scores.length === 0 ? (
          <div className="flex flex-col rounded-lg mt-4 gap-4">
            <p>No scores yet, be the first to submit a score!</p>
            {isAuthenticated ? (
              <div className="col-span-full md:col-auto">
                <ScoreFormModal selectedTripId={tripData.tripId} />
              </div>
            ) : (
              <div className="rounded-md bg-primary-coral text-white p-2 w-full md:w-1/4 text-center">
                Sign in to submit a score!
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tripData.scores.map((score) => (
                <ScoreCard key={score.id} score={score} />
              ))}
            </div>
            {isAuthenticated ? (
              <div className="col-span-full md:col-auto">
                <ScoreFormModal selectedTripId={tripData.tripId} />
              </div>
            ) : (
              <div className="rounded-md bg-primary-coral text-white p-2 w-full md:w-1/4 text-center">
                Sign in to submit a score!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pictures */}
      <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-1">Photos</h2>
        <div aria-hidden className="bg-primary-green h-1 w-10 mb-2"></div>

        {hasPhotos ? (
          tripData.photos.map((photo) => {
            return (
              <div key={photo.id} className="inline-block mr-4 mb-4">
                <img
                  src={photo.photoUrl}
                  alt={photo.userName ?? 'trip photo'}
                  className="max-w-xs rounded-md shadow-sm object-cover"
                />
                <p className="text-sm text-gray-500 mt-1">{photo.userName}</p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 my-4">No photos yet.</p>
        )}

        {isAuthenticated ? (
          <div className="col-span-full md:col-auto">{/* photouploadmodal */}</div>
        ) : (
          <div className="rounded-md bg-primary-coral text-white p-2 w-full md:w-1/4 text-center">
            Sign in to submit a photo!
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPage;
