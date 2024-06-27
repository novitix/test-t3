"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export function PlayNowButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/play")}
      className="flex w-[20rem] cursor-pointer flex-col items-center justify-center gap-4 rounded-xl bg-white/10 px-4 py-8 hover:bg-white/20"
    >
      <h3 className="text-2xl font-bold">Play Now →</h3>
    </Button>
  );
}
