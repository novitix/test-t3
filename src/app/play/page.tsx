"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export default function PlayPage() {
  const router = useRouter();
  const getRandomNetworths = api.networth.getRandom.useQuery({ count: 2 });
  const [score, setScore] = useState<number>(0);
  useEffect(() => {});
  const person1 = getRandomNetworths.data?.at(0);
  const person2 = getRandomNetworths.data?.at(1);

  if (!person1 || !person2) return;

  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "AUD",
  });

  function handleSelect(option: "higher" | "lower") {
    const win =
      (option === "higher" && person2!.amount >= person1!.amount) ||
      (option === "lower" && person2!.amount <= person1!.amount);

    if (win) {
      setScore((v) => v + 1);
      getRandomNetworths.refetch();
    } else {
      alert("You lost.");
      router.push("/");
    }
  }

  return (
    <div className="relative flex h-full">
      <p className="absolute text-2xl">Score: {score}</p>
      <div className="absolute inset-0 mx-auto my-auto h-[100px] w-[100px] rounded-[50%] bg-white text-center text-4xl font-medium leading-[100px] text-black">
        vs
      </div>
      <div
        className="my-auto flex grow basis-0 flex-col items-center gap-4 object-cover"
        // style={{ backgroundImage: `url(${person1?.imgUrl})` }}
      >
        <p className="text-4xl font-semibold">{person1?.fullName}</p>
        <p>has a networth of</p>
        <p className="text-5xl  font-semibold">
          {currencyFormatter.format(person1?.amount!).split(".")[0]}
        </p>
      </div>
      <div
        className="my-auto flex  grow basis-0 flex-col items-center gap-4 object-cover"
        // style={{ backgroundImage: `url(${person2?.imgUrl})` }}
      >
        <p className="text-4xl font-semibold">{person2?.fullName}</p>
        <p>has a networth</p>
        <div className="flex w-[180px] flex-col gap-1">
          <Button className="py-6" onClick={() => handleSelect("higher")}>
            Higher
          </Button>
          <Button className="py-6" onClick={() => handleSelect("lower")}>
            Lower
          </Button>
        </div>
        <p>than {person1?.fullName}</p>
      </div>
    </div>
  );
}
