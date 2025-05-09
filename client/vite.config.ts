/// <reference types="vitest" />
import path from "path"
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { Meta } from "./plugins/meta.js"
import fs from "fs-extra"
import { visualizer } from "rollup-plugin-visualizer"

type Author = {
  name: string
  email: string
  url: string
}

function resolveAuthor(author: string | Author) {
  if (typeof author === "string") {
    const authorArr = author.split(" ")
    if (authorArr.length === 1) {
      return {
        name: authorArr[0],
        email: "",
        url: "",
      }
    } else {
      const email = author.match(/(?<=\<)(.*)(?=\>)/g)?.[0] ?? ""

      const url = author.match(/(?<=\()(.*)(?=\))/g)?.[0] ?? ""

      const name = author
        .replace(/\<.*\>/g, "")
        .replace(/\(.*\)/g, "")
        .trim()
      return {
        name,
        email,
        url,
      }
    }
  } else {
    return author
  }
}

const pkg = fs.readJSONSync(path.resolve("./package.json"))

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: "./",
    server: {
      host: true,
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      Meta({
        stage: env.VITE_STAGE,
        dependencies: Object.keys(pkg.dependencies).map((v: string) => {
          const dependencePkg = fs.readJSONSync(
            path.resolve("./node_modules", v, "package.json"),
          )
          return {
            name: v,
            version: pkg.dependencies[v],
            description: dependencePkg.description,
            homepage: dependencePkg.homepage,
            author: resolveAuthor(dependencePkg.author),
          }
        }),
        author: resolveAuthor(pkg.author),
        version: pkg.version,
        description: pkg.description,
        homepage: pkg.homepage,
        bugs: pkg.bugs,
        repository: pkg.repository,
        name: pkg.name
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/( |^)[a-z]/g, (L: string) => L.toUpperCase()),
        license: pkg.license,
        keywords: pkg.keywords,
      }),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        open: false,
      }),
    ],
    define: {
      __VUE_OPTIONS_API__: "false",
      __VUE_PROD_DEVTOOLS__: "false",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.esm-bundler.js",
        "~": path.resolve(__dirname, "../"),
      },
    },
    test: {
      environment: "jsdom",
      reporters: ["html", "default"],
      outputFile: path.resolve("./public/test/index.html"),
      coverage: {
        reporter: ["html", "json", "text"],
        provider: "v8",
        enabled: true,
        reportsDirectory: path.resolve("./public/test/coverage"),
      },
      deps: {
        interopDefault: true,
        moduleDirectories: ["node_modules"],
      },
      include: ["tests/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    },
    worker: {
      format: "es",
    },
  })
}
