
import { auth } from '@clerk/nextjs/server'
import SubmitControls from '@/components/SubmitControls';
import LoginCTA from '@/components/LoginCTA';

export default async function Page() {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return (
      <LoginCTA/>
    )
  }
 
  const { userId } = await auth()

  return (
    <div>
      <SubmitControls userId={userId ?? undefined} />
    </div>
  )
}