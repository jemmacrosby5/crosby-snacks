import { ProfilePicture } from '@components/ProfilePicture';

type Score = {
  id: number;
  userId: string;
  userName: string;
  userPic: string | null;
  highScore: number;
  lowScore: number;
};
interface Props {
  score: Score; // to fix
}

export function ScoreCard({ score }: Props) {
  return (
    <div className="shadow rounded p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ProfilePicture picUrl={score.userPic} name={score.userName} />
        <p className="text-lg font-medium">{score.userName}</p>
      </div>

      <div className="grid grid-cols-2 bg-gray-100 rounded divide-x divide-gray-300 p-2 justify-between">
        <div className="p-2 md:min-w-20 flex flex-col items-center text-primary-green font-semibold">
          <p>High</p>
          <p className="text-xl">{score.highScore}</p>
        </div>
        <div className="p-2 md:min-w-20 flex flex-col items-center text-primary-coral font-semibold">
          <p>Low</p>
          <p className="text-xl">{score.lowScore}</p>
        </div>
      </div>
    </div>
  );
}
