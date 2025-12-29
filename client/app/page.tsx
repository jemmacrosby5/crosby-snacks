import Leaderboard from "../components/Leaderboard";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Leaderboard/>
      <Link href="/trip">View all trips</Link>
    </>
  );
}
