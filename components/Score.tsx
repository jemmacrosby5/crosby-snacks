interface props {
  highScore: number;
  lowScore: number;
}

export default function Score({ highScore, lowScore }: props) {
  return (
    <div className="flex divide-x divide-gray-200 items-center py-2 px-4 bg-secondary-green rounded-lg w-fit">
      <div className="flex flex-col items-center pr-3">
        <p className="text-sm">High</p>
        <p className="text-lg font-bold">{highScore.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-center pl-3">
        <p className="text-sm">Low</p>
        <p className="text-lg font-bold">{lowScore.toFixed(2)}</p>
      </div>
    </div>
  );
}
