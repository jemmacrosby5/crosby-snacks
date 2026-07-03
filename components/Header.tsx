'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import LinkButton from '@components/LinkButton';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../app/assets/logo.svg';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-primary-blue shadow">
      {/* Left: Title */}
      <Link href="/" className="text-xl font-semibold flex items-center">
        <Image src={logo} alt="cat-logo" className="h-14 w-auto" />
        <h1 className="text-xl font-bold text-pretty">Crosby Snacks</h1>
      </Link>

      {/* Right: Buttons */}
      <SignedOut>
        <div className="flex items-center gap-2">
          <SignInButton>
            <button
              type="button"
              className="bg-primary-green cursor-pointer text-white px-3 py-2 rounded-md font-semibold hover:opacity-95 transition"
            >
              Login
            </button>
          </SignInButton>
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
