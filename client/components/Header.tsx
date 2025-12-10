import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full px-6 py-4 flex items-center justify-between bg-white shadow">
            {/* Left: Title */}
            <h1 className="text-xl font-semibold">Crosby Snacks</h1>

            {/* Right: Buttons */}
            <div className="flex items-center gap-3">
                <Link href="/login">
                    <button className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition cursor-pointer">
                        Login
                    </button>
                </Link>

                <button className="px-4 py-2 rounded-lg bg-black text-white hover:opacity-80 transition cursor-pointer">
                    Profile
                </button>
            </div>
        </header>
    );
}
