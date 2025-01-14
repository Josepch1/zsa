import "swagger-ui-react/swagger-ui.css"
import { generateOpenApiDocument } from "zsa-openapi"
import { router } from "../api/[[...openapi]]/route"
import SwaggerUI from "swagger-ui-react"

export default async function DocsPage() {
  const spec = await generateOpenApiDocument(router, {
    title: "ZSA OpenAPI",
    version: "1.0.0",
    baseUrl: "http://localhost:3000",
  })

  return <SwaggerUI spec={spec} />
}