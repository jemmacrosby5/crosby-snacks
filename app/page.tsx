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
        <StatBoxes/>
      </section>

      <Leaderboard />
      <Link href="/trip">View all trips</Link>
      <Link href="/rules">View the rules</Link>
    </>
  );
}
