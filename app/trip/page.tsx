import Leaderboard from '@components/Leaderboard';
export const dynamic = 'force-dynamic';
const TripHomePage = async () => {
  return (
    <>
      <div className="flex flex-col w-full items-center text-center gap-6 ">
        <h1 className="font-bold text-4xl">All Trips</h1>
        <p>Click on a trip to see everyone's votes!</p>
        <Leaderboard />
      </div>
    </>
  );
};

export default TripHomePage;
