import { Score } from '@utils/types';
import ProfilePicture from '@/components/ProfilePicture';

type Props = {
  score: Score;
};

export function ScoreCard({ score }: Props) {
  const user = score.userId;

  console.log(score);
  return (
    <div className="shadow rounded p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ProfilePicture picUrl={user.picUrl} name={user.name} />
        <p className="text-lg font-medium">{user.name}</p>
      </div>

      <div className="flex bg-gray-100 rounded divide-x divide-gray-300 p-2 min-w-40 justify-between">
        <div className="p-2 min-w-20 flex flex-col items-center text-blue-500 font-semibold">
          <p>High</p>
          <p className="text-xl">{score.highScore}</p>
        </div>
        <div className="p-2 min-w-20 flex flex-col items-center text-red-500 font-semibold">
          <p>Low</p>
          <p className="text-xl">{score.lowScore}</p>
        </div>
      </div>
    </div>
  );
}
