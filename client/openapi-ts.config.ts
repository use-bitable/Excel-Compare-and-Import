import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "./openapi.json",
  output: "./src/server-sdk",
  // exportSchemas: true,
  plugins: [
    "@hey-api/client-fetch",
    {
      name: "@hey-api/sdk",
      asClass: true,
      operationId: true,
      methodNameBuilder: (operation) => {
        // @ts-ignore
        let name: string = operation.name
        // @ts-ignore
        const service: string = operation.service

        if (service && name.toLowerCase().startsWith(service.toLowerCase())) {
          name = name.slice(service.length)
        }

        return name.charAt(0).toLowerCase() + name.slice(1)
      },
    },
  ],
})
