import { auth, signIn, signOut } from "auth";
import Link from "next/link";

import { api } from "~/trpc/server";
import { SignInButton } from "../_components/sign-in-button";
import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { PlayNowButton } from "./play-now-button";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Guess Their{" "}
          <span className="text-[hsl(280,100%,70%)]">Net Worth</span>
        </h1>
        <h2 className="max-w-[800px] text-center text-4xl sm:text-[1.5rem]">
          A game of high or lower, but with celebrity's net worths. Choose the
          person who you think has the higher net worth.
        </h2>
        <PlayNowButton />
      </div>
    </main>
  );
}
