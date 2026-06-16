import { auth } from '@clerk/nextjs/server';
import LoginCTA from '@/components/LoginCTA';
import TripDetailsBox from '@components/TripDetailsBox';
import { getAllTrips } from '@db/queries';
import Link from 'next/link';

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <LoginCTA />;
  }
  const tripsData = await getAllTrips();

  return (
    <>
      <h1 className="text-3xl font-semibold mt-4 text-center">Submit a Score</h1>
      <p className="text-gray-500 mb-6 text-center">
        Which trip would you like to submit a score for?
      </p>

      <div className="flex flex-wrap gap-4">
        {tripsData.map((trip) => (
          <Link
            href={`/trip/${trip.id}`}
            key={trip.id}
            className={`w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-1rem)] bg-white cursor-pointer rounded-md p-4 text-left`}
          >
            <TripDetailsBox trip={trip} />
          </Link>
        ))}
      </div>
    </>
  );
}
