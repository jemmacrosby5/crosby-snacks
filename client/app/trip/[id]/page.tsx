import ProfilePicture from "@/components/ProfilePicture";
import { apiFetch } from "@/utils/functions";
import Link from "next/link";

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
  let scores = [];
  let tripDetails

  scores = await apiFetch(`/trip/${encodeURIComponent(id)}/scores`);
  tripDetails = await apiFetch(`/trip/${encodeURIComponent(id)}`);

  return (
    <>

      <div className="flex gap-4 items-center">
        <img
          src={`https://flagcdn.com/${(tripDetails?.countryId?.code)?.toLowerCase()}.svg`}
          alt={`${tripDetails?.countryId?.name} flag`}
          className="w-10 h-7 rounded-sm shadow-md border border-gray-200 object-cover"
        />
        <h1 className="text-3xl font-bold my-6">{tripDetails?.countryId?.name}</h1>
      </div>

      <div>{tripDetails?.participants?.map((participant: Participant) => (
        <div key={participant._id}>{participant.name}</div>
      ))}</div>
      <div>
        {tripDetails?.description}
        {new Date(tripDetails?.date)?.toLocaleDateString("en-GB")}
      </div>

      <h2 className="text-2xl font-bold my-6">Scores</h2>
      {scores.length === 0 && (
        <div className="flex">
          <p>No scores yet!</p>
          <Link href='/submit/score' className="cursor-hover bg-blue-500 p-4 m-4 rounded">Submit a score</Link>
        </div>
      )}
      <div>
        {scores.map((score: any) => (
          <div className="shadow rounded m-4 p-4 flex items-center gap-6" key={score._id}>
            <ProfilePicture picUrl={score.userId.picUrl} name={score.userId.name} />
            <p>{score.userId.name}: {score.highScore} {score.lowScore}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TripPage;
