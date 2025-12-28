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

  const backendUrl = process.env.BACKEND_URL;
  let scores = [];
  let tripDetails

  if (backendUrl) {
    try {
      const detailsRes = await fetch(
        `${backendUrl}/trip/${encodeURIComponent(id)}`,
        { cache: "no-store" }
      );
      
      tripDetails = await detailsRes.json();
      
      const scoresRes = await fetch(
        `${backendUrl}/trip/${encodeURIComponent(id)}/scores`,
        { cache: "no-store" }
      );
      scores = await scoresRes.json();
      console.log(scores)
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  }

  return (
    <>

      <div className="flex gap-4 items-center">
        <img
          src={`https://flagcdn.com/${(tripDetails?.countryId?.code).toLowerCase()}.svg`}
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
        {new Date(tripDetails?.date).toLocaleDateString("en-GB")}
      </div>

      <h2 className="text-2xl font-bold my-6">Scores</h2>
      <div>
        {scores.map((score: any) => (
          <div className="shadow rounded m-4 p-4" key={score._id}>
            <p>{score.userId.name}: {score.highScore} {score.lowScore}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TripPage;
