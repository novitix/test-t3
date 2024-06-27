"use client";

import { auth } from "auth";
import clsx from "clsx";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function NavigationBar(props: { session: Session | null }) {
  return (
    <div className={clsx("flex justify-between bg-transparent px-8 py-4")}>
      <Link className="text-2xl font-bold" href="/">
        Band 4 Band
      </Link>
      <div className="flex gap-8 font-semibold uppercase">
        <Link href="/dashboard">Dashboard</Link>
        <div
          className="cursor-pointer"
          onClick={() =>
            props.session === null ? signIn("google") : signOut()
          }
        >
          {props.session === null ? "Sign In" : "Sign Out"}
        </div>
      </div>
    </div>
  );
}
