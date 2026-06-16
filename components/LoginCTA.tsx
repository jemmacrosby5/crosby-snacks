export default function LoginCTA() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-2xl text-center p-8 rounded-xl shadow-lg bg-white">
        <div className="text-6xl mb-2">✈️</div>
        <h2 className="m-0 mb-2 text-xl font-semibold">Sign in to submit scores</h2>
        <p className="m-0 text-sm text-slate-700">
          Sign in to add your trip scores, track your trips, and appear on the leaderboard.
        </p>

        <div className="mt-5">
          <a
            href="/login"
            className="inline-block px-4 py-2 bg-primary-green text-white rounded-md font-semibold hover:opacity-90 transition"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
