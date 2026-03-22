import { auth } from '@clerk/nextjs/server';
import { apiFetch } from '@/utils/functions';

import LoginCTA from '@/components/LoginCTA';
import NewTripForm from '@/components/NewTripForm';

export default async function Page() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return <LoginCTA />;
  }

  const fetchedCountries = await apiFetch(`/country/`);
  const fetchedUsers = await apiFetch(`/user/all`);

  if (!fetchedCountries || !fetchedUsers) {
    return <p>Oops, sorry, there's been an error!</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mt-4 text-center">Create a new trip</h1>
      <p className="text-gray-500 mb-6 text-center">Add trip details and select who joined</p>
      <div className="min-h-screen flex justify-center">
        <NewTripForm countries={fetchedCountries} users={fetchedUsers}></NewTripForm>
      </div>
    </>
  );
}
