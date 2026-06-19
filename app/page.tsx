import Leaderboard from '@components/Leaderboard';
import StatBoxes from '@/components/StatBoxes';
import LinkButton from '@/components/LinkButton';
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <>
      <section className="flex flex-col w-full items-center text-center my-4 gap-4 ">
        <h2 className="font-bold text-4xl md:text-6xl">
          Rating snacks from
          <br />
          <span className="text-primary-green">around the world.</span>
        </h2>
        <StatBoxes />
      </section>

      <section className="flex flex-col gap-3 items-center mt-16">
        <h2 className="text-4xl font-bold text-center">Leaderboard</h2>
        <div aria-hidden className="bg-primary-coral h-1 w-10"></div>
        <p>The current top 5 trips are:</p>

        {/* <Leaderboard limit={5} /> */}

        <div className="flex gap-4 my-4 md:flex-row flex-col">
          <LinkButton type="primary" label="View all trips" link="/trip" />
          <LinkButton type="secondary" label="View the rules" link="/rules" />
        </div>
      </section>
    </>
  );
}
