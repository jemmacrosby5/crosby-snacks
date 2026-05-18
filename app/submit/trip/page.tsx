import { auth } from '@clerk/nextjs/server';
import { getAllUsers,getAllCountries } from '@db/queries'
import { User, Country} from '@utils/types'
import LoginCTA from '@/components/LoginCTA';
import NewTripForm from '@/components/NewTripForm';

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <LoginCTA />;
  }

  const users: User[] = await getAllUsers()
  const countries: Country [] = await getAllCountries()

  return (
    <>
      <h1 className="text-3xl font-semibold mt-4 text-center">Create a new trip</h1>
      <p className="text-gray-500 mb-6 text-center">Add trip details and select who joined</p>
      <div className="flex justify-center">
        <NewTripForm countries={countries} users={users}></NewTripForm>
      </div>
    </>
  );
}
