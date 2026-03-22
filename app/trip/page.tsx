import { LeaderboardEntry } from '@utils/types';
import { getLeaderBoard } from '@db/queries'
import Leaderboard from '@components/Leaderboard'

const TripHomePage = async () => {
  const allTrips: LeaderboardEntry[] = await getLeaderBoard()
console.log(allTrips)
  return (
    <>
      <h1 className="font-bold text-2xl my-6">All Trips</h1>

          
       <Leaderboard/>
    </>

  )
};

export default TripHomePage;
