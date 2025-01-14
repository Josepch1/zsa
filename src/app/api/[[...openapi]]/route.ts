import { hello, slugGenerator } from '@/app/actions'
import { createOpenApiServerActionRouter, createRouteHandlers } from 'zsa-openapi'

export const router = createOpenApiServerActionRouter({
  pathPrefix: '/api',
})
  .get("/hello", hello, {
    tags: ["hello"],
  })
  .post("/slug", slugGenerator, {
    tags: ["slug"],
  })

export const { GET, POST } = createRouteHandlers(router)