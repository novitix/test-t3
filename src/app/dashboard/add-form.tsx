"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z ,.'-]+$/i, "Please enter a valid name."),
  amount: z.coerce
    .number({ message: "Please enter a valid number." })
    .int()
    .nonnegative({ message: "Networth must be greater than 0." }),
});

export function AddForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const addNetworth = api.networth.add.useMutation({
    onSuccess: () => {
      form.reset();
      router.refresh();
    },
    onError: ({ message }) => {
      alert(`Error: ${message}`);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addNetworth.mutate({ fullName: values.fullName, amount: values.amount });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celebrity Name</FormLabel>
              <FormControl>
                <Input placeholder="Celebrity Name" {...field} />
              </FormControl>
              <FormDescription>The name of the celebrity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Networth</FormLabel>
              <FormControl>
                <Input type="nu" placeholder="Networth ($)" {...field} />
              </FormControl>
              <FormDescription>
                The celebrity's networth in US dollars.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
