interface props {
  highScore: number;
  lowScore: number;
}

export default function Score({ highScore, lowScore }: props) {
  return (
    <div className="flex divide-x divide-gray-200 items-center py-2 px-4 bg-slate-100 rounded-lg border w-fit border-gray-200">
      <div className="flex flex-col items-center pr-2">
        <p className="text-sm">High</p>
        <p className="text-lg font-bold">{highScore.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-center pl-2">
        <p className="text-sm">Low</p>
        <p className="text-lg font-bold">{lowScore.toFixed(2)}</p>
      </div>
    </div>
  );
}