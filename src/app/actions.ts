"use server";

import z from "zod";
import { createServerAction } from "zsa";

export const slugGenerator = createServerAction()
  .input(
    z.object({
      title: z
        .string()
        .min(5)
        .transform(async (val) => {
          const normalized = val
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          return normalized
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
        }),
    })
  )
  .output(z.object({ slug: z.string() }))
  .handler(async ({ input }) => {
    return { slug: input.title };
  });

export const hello = createServerAction()
  .input(
    z.object({
      title: z
        .string()
        .min(5),
    })
  )
  .output(z.object({ message: z.string() }))
  .handler(async ({ input }) => {
    return { message: "Hello, " + input.title };
  });
