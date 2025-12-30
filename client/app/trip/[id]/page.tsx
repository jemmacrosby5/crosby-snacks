
import { ScoreCard } from "@/components/ScoreCard"
import { apiFetch } from "@/utils/functions";
import Link from "next/link";
import { Score } from "@utils/types"

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
  let scores: Score[] = [];
  let tripDetails

  scores = await apiFetch(`/trip/${encodeURIComponent(id)}/scores`);
  tripDetails = await apiFetch(`/trip/${encodeURIComponent(id)}`);

  return (
  <div className="flex flex-col gap-4">
    <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={`https://flagcdn.com/${tripDetails?.countryId?.code?.toLowerCase()}.svg`}
          alt={`${tripDetails?.countryId?.name} flag`}
          className="w-12 h-8 rounded-md shadow-sm border object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">
            {tripDetails?.countryId?.name}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(tripDetails?.date).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>

      {/* Description */}
      {tripDetails?.description && (
        <p className="text-gray-700 mb-6">
          {tripDetails.description}
        </p>
      )}

      {/* Participants */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">
          Participants
        </h3>
        <div className="flex flex-wrap gap-3">
          {tripDetails?.participants?.map((participant: Participant) => (
            <div
              key={participant._id}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
            >
              {participant.name}
            </div>
          ))}
        </div>
      </div>


    </div>
    <div className="w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Scores</h2>
      {scores.length === 0 ? (
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
{       scores.map((score)=> {
        return <ScoreCard key={score._id} score={score}/>
       })}
       </div>
      )}
    </div>
  </div>
);

};

export default TripPage;
