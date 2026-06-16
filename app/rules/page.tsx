export default async function Rules() {
  return (
    <>
      <div className="flex flex-col w-full items-center text-center gap-6">
        <h1 className="font-bold text-4xl">Rules</h1>
        <div className="text-left text-lg bg-white p-4 rounded-lg shadow-sm mx-10">
          <ol className="list-decimal pl-6 space-y-2">
            <li>Score trips fairly, no cheating!</li>
            <li>Submit only one score for each trip, all votes are final.</li>
            <li>
              The trip with the largest difference between the average high and average low score
              wins.
            </li>
            <li>No copying/manipulating votes.</li>
            <li>
              Contact the admins if you believe a score is invalid or a participant violated the
              rules.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
