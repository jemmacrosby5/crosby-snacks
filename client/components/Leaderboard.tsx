import Link from "next/link";

export default async function Leaderboard() {
    const backendUrl = process.env.BACKEND_URL;
    let scores = [];
  
    if (backendUrl) {
      try {
        scores = await fetch(`${backendUrl}/score/average`, {
          cache: "no-store",
        }).then((res) => res.json());
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    } else {
      console.error("BACKEND_URL is not defined");
    }
  
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>
  
        {scores.length === 0 && (
          <p className="text-gray-500 text-center">No scores available.</p>
        )}
  
        <div className="flex flex-col gap-4">
          {scores.map((score) => (
            <Link href={`/country/${score.countryId}`} key={score.countryId}>
            <div
              key={score.countryId}
              className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`https://flagcdn.com/${score.countryCode.toLowerCase()}.svg`}
                  alt={`${score.countryName} flag`}
                  className="w-10 h-7 rounded-lg shadow-md border border-gray-200 object-cover"
                />
  
                <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  {score.countryName} ({score.countryCode})
                </span>
              </div>
              </div>
  
              <div className="grid grid-cols-3 gap-6 text-right">
                <div>
                  <p className="text-sm text-gray-500">Avg High</p>
                  <p className="font-bold">{score.avgHighScore.toFixed(1)}</p>
                </div>
  
                <div>
                  <p className="text-sm text-gray-500">Avg Low</p>
                  <p className="font-bold">{score.avgLowScore.toFixed(1)}</p>
                </div>
  
                <div>
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="font-bold">{score.avgDifference.toFixed(2)}</p>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  