import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full px-6 py-4 flex items-center justify-between bg-white shadow">

            {/* Left: Title */}
            <Link href="/" className="text-xl font-semibold">
                Crosby Snacks
            </Link>

            {/* Right: Buttons */}
            <SignedOut>
                <div className='flex justify-between gap-2'>
                    <SignInButton>
                        <button className="bg-blue-300 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            Login
                        </button>
                    </SignInButton>
                    <SignUpButton>
                        <button className="bg-blue-300 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                            Register
                        </button>
                    </SignUpButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    );
}
