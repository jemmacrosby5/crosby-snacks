import Leaderboard from '@components/Leaderboard';
export const dynamic = 'force-dynamic';
const TripHomePage = async () => {
  return (
    <>
      <h1 className="font-bold text-2xl my-6">All Trips</h1>
      <Leaderboard />
    </>
  );
};

export default TripHomePage;
