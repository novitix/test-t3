"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export function SignInButton(props: { session: Session | null }) {
  return (
    <div
      className="cursor-pointer rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      onClick={() => (props.session ? signOut() : signIn("google"))}
    >
      {props.session ? "Sign out" : "Sign in"}
    </div>
  );
}
