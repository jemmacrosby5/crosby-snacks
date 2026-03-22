import Link from 'next/link';
import { apiFetch } from '@/utils/functions';
import { Score } from '@/utils/types';

import { Icon } from '@/components/Icon';
import { ScoreCard } from '@/components/ScoreCard';
import { ProfilePicture } from '@/components/ProfilePicture';

interface TripPageProps {
  params: Promise<{
    id: string;
  }>;
}

type Participant = {
  _id: string;
  name: string;
  picUrl?: string | null;
};

const TripPage = async ({ params }: TripPageProps) => {
  const { id } = await params;


  return (
    <p>hi</p>
    // <div className="flex flex-col gap-4">
    //   {/* Details */}
    //   <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
    //     <div className="flex items-center gap-4 mb-2">
    //       <img
    //         src={`https://flagcdn.com/${tripDetails?.countryId?.code?.toLowerCase()}.svg`}
    //         alt={`${tripDetails?.countryId?.name} flag`}
    //         className="w-12 h-8 rounded-md shadow-sm object-cover"
    //       />
    //       <h1 className="text-3xl font-bold">{tripDetails?.countryId?.name}</h1>
    //     </div>

    //     <div className="flex gap-2 mb-4 items-center">
    //       <Icon name="calendar" size={20} className="text-gray-600" />
    //       <p className="text-gray-500">
    //         {new Date(tripDetails?.date).toLocaleDateString('en-GB', {
    //           day: 'numeric',
    //           month: 'long',
    //           year: 'numeric',
    //         })}
    //       </p>
    //     </div>

    //     {tripDetails?.description && (
    //       <p className="text-gray-700 mb-2">{tripDetails.description}</p>
    //     )}

    //     <div className="border border-gray-100 mb-2" />

    //     <div>
    //       <h3 className="text-sm font-semibold text-gray-500">Trip Participants</h3>
    //       <div className="flex flex-wrap gap-2">
    //         {tripDetails?.participants?.map((participant: Participant) => (
    //           <div key={participant._id} className="px-4 py-2 text-sm font-medium">
    //             <ProfilePicture picUrl={participant.picUrl} name={participant.name} />
    //             {participant.name}
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     <div className="grid grid-cols-2 bg-gray-100 rounded divide-x divide-gray-300 p-2 justify-between">
    //       <div className="p-2 min-w-20 flex flex-col items-center text-blue-500 font-semibold">
    //         <p>Average High</p>
    //         <p className="text-xl">{avgScores.avgHigh}</p>
    //       </div>
    //       <div className="p-2 min-w-20 flex flex-col items-center text-red-500 font-semibold">
    //         <p>Average Low</p>
    //         <p className="text-xl">{avgScores.avgLow}</p>
    //       </div>
    //       <p>Diff: {avgScores.diff}</p>
    //     </div>
    //   </div>

    //   {/* Scores */}
    //   <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
    //     <h2 className="text-2xl font-bold mb-4">Scores</h2>
    //     {scores.length === 0 ? (
    //       <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-4">
    //         <p className="text-gray-600">No scores yet</p>
    //         <Link
    //           href="/submit/score"
    //           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
    //         >
    //           Submit a score
    //         </Link>
    //       </div>
    //     ) : (
    //       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    //         {scores.map((score: Score) => {
    //           return <ScoreCard key={score._id} score={score} />;
    //         })}
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default TripPage;
