import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  clean: true,
  declaration: true,
  externals: ["@nuxt/schema", "#app", "consola", "@graphql-codegen/cli", "@graphql-codegen/plugin-helpers"],
})
