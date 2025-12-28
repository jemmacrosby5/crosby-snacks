import Link from "next/link";

type LeaderboardEntry = {
  _id?: string;
  tripId?: string;
  scoreCount: number;
  country: { name: string; code: string };
  date?: string;
  participants?: { _id: string; name: string; picUrl?: string }[];
  avgHigh?: any;
  avgLow?: any;
};

function parseDecimal(v: any) {
  if (v && typeof v === "object" && "$numberDecimal" in v) {
    return parseFloat(v.$numberDecimal);
  }
  return typeof v === "string" ? parseFloat(v) : Number(v || 0);
}

export default async function Leaderboard() {
  const backendUrl = process.env.BACKEND_URL;
  let scores: LeaderboardEntry[] = [];

  if (!backendUrl) {
    console.error("BACKEND_URL is not defined");
  } else {
    try {
      const res = await fetch(`${backendUrl}/score/leaderboard`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      scores = await res.json();
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Leaderboard</h2>

      {scores.length === 0 && (
        <p className="text-gray-500 text-center">No scores available.</p>
      )}

      <div className="flex flex-col gap-4">
        {scores.map((entry) => {
          const id = entry.tripId ?? entry._id;
          const countryName = entry.country?.name ?? "Unknown";
          const countryCode = (entry.country?.code).toLowerCase() ?? "";
          const avgHigh = parseDecimal(entry.avgHigh);
          const avgLow = parseDecimal(entry.avgLow);
          const avgDiff = avgHigh - avgLow;

          return (
            <Link href={`/trip/${id}`} key={id}>
              <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between border border-gray-100 hover:shadow-lg transition cursor-pointer">
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://flagcdn.com/${countryCode}.svg`}
                    alt={`${countryName} flag`}
                    className="w-10 h-7 rounded-sm shadow-md border border-gray-200 object-cover"
                  />

                  <div className="flex flex-col">
                    <span className="text-lg font-semibold">
                      {countryName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {entry.date ? new Date(entry.date).toLocaleDateString() : ""}
                    </span>
                  </div>
                    <div className="flex items-center gap-2 mt-2">
                      {entry.participants?.map((p) => (
                        <div key={p._id}>
                        <p>{p.name}</p>
                        <img
                          src={p.picUrl ?? "/avatar-placeholder.png"}
                          alt={p.name}
                          title={p.name}
                          className="w-7 h-7 rounded-full border"
                        />
                        </div>
                      ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 text-right">
                  <div>
                    <p className="text-sm text-gray-500">Avg High</p>
                    <p className="font-bold">
                      {isNaN(avgHigh) ? "-" : avgHigh.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Avg Low</p>
                    <p className="font-bold">
                      {isNaN(avgLow) ? "-" : avgLow.toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Diff</p>
                    <p className="font-bold">
                      {isNaN(avgDiff) ? "-" : avgDiff.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}