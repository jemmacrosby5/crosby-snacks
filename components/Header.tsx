'use client';

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Icon } from '@components/Icon';
import LinkButton from '@components/LinkButton';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-primary-blue shadow">
      {/* Left: Title */}
      <Link href="/" className="text-xl font-semibold flex items-center gap-2">
        <div className="rounded-full bg-slate-600 p-1">
          <Icon name="cookie" size={40} className="text-white" />
        </div>
        <h1 className="text-xl font-bold sm:block hidden">Crosby Snacks</h1>
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
          <LinkButton
            type="primary"
            link="/submit/trip"
            label="Create Trip"
            customClass="text-sm w-20 text-center px-2 sm:w-fit sm:text-base"
          />
          <LinkButton
            type="secondary"
            label="Submit Score"
            link="/submit/score"
            customClass="text-sm w-20 text-center px-2 sm:w-fit sm:text-base"
          />
          <UserButton />
        </div>
      </SignedIn>
    </header>
  );
}
