"use server"

import z from "zod"
import { createServerAction } from "zsa"

export const produceNewMessage = createServerAction()
  .input(
    z.object({
      name: z.string().min(5),
    }),
  )
  .handler(async ({ input }) => {
    return "Hello, " + input.name
  })