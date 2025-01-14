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
import { slugGenerator } from "./actions";
import { useSlugStore } from "./slug-store";

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .transform((val) => val.toLowerCase()),
});

export default function ReactHookForm() {
  const { isPending, execute, error } = useServerAction(slugGenerator);
  const { resetSlug, setSlug, slug } = useSlugStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [data, err] = await execute(values);

    if (err) {
      console.log(err);
      return;
    }

    setSlug(data.slug);

    form.reset();
  }

  return (
    <div className="flex justify-center items-center mt-5">
      <Card className="not-prose w-96">
        <CardHeader>
          <CardTitle>Form</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
          {slug && <div>Slug: {slug}</div>}
          {error && <div>Error: {JSON.stringify(error.fieldErrors)}</div>}
          <Button
            onClick={() => {
              resetSlug();
            }}
          >
            Reset Slug
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
