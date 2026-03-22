import Leaderboard from '@components/Leaderboard';
import Link from 'next/link';
import StatBoxes from '@/components/StatBoxes'


export default async function Home() {
  return (
    <>
      <section className="flex flex-col w-full items-center text-center my-4 gap-4">
        <p className="font-bold text-2xl">
          Rating snacks from <span className="text-green-800">around the world.</span>
        </p>
        <StatBoxes />
      </section>

      <section className="flex flex-col gap-4 items-center mt-10">
        <h2 className="text-3xl font-bold text-center">Leaderboard</h2>
        <p>The current top 5 trips are:</p>
        <Leaderboard limit={5} />
        <div className="flex gap-2">
          <Link className="bg-slate-600 rounded-md w-fit p-4 text-white" href="/trip">View all trips</Link>
          <Link className="bg-slate-600 rounded-md w-fit p-4 text-white" href="/rules">View the rules</Link>
        </div>
      </section>
    </>
  );
}
