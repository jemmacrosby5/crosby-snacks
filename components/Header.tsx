import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Icon } from '@components/Icon';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-primary-blue shadow">
      {/* Left: Title */}
      <Link href="/" className="text-xl font-semibold flex items-center gap-2">
        <div className="rounded-full bg-slate-600 p-1">
          <Icon name="cookie" size={40} className="text-white" />
        </div>
        <h1 className="text-xl font-bold">Crosby Snacks</h1>
      </Link>

      {/* Right: Buttons */}
      <SignedOut>
        <div className="flex justify-between gap-2">
          <SignInButton>Login</SignInButton>
          <SignUpButton>Register</SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex gap-4">
          <Link href="/submit/trip" className="cursor-pointer bg-slate-600 text-white p-2 rounded">
            Create Trip
          </Link>
          <Link href="/submit/score" className="cursor-pointer bg-slate-600 text-white p-2 rounded">
            Submit Score
          </Link>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}
