"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { produceNewMessage } from "./actions";
import { useStore } from "./store";
import { useEffect } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters.",
    })
    .transform((val) => val.toLowerCase()),
});

export default function ReactHookForm() {
  const { isPending, execute, data, error } =
    useServerAction(produceNewMessage);
  const { message, resetMessage, setMessage } = useStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [, err] = await execute(values);

    if (err) {
      console.log(err);
      return;
    }

    setMessage(data!);

    form.reset();
  }

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div className="flex justify-center items-center mt-5">
      <Card className="not-prose w-96">
        <CardHeader>
          <CardTitle>Form Example</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </Form>
          {message && <div>Message: {message}</div>}
          {error && <div>Error: {JSON.stringify(error.fieldErrors)}</div>}
          <Button
            onClick={() => {
              resetMessage();
            }}
          >
            Reset Message
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
