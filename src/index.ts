import { defineNuxtModule } from "@nuxt/kit";
import { generate, loadContext } from "@graphql-codegen/cli";
import consola from "consola";
import type { Types } from "@graphql-codegen/plugin-helpers";
// @ts-expect-error #app resolved by Nuxt3
import { NuxtApp } from '#app'

type CodegenModuleOptions = Types.Config;

export default defineNuxtModule<CodegenModuleOptions>({
  
  meta: {
    name: '@nuxt3/graphql-codegen-module',
    configKey: 'graphqlCodegen',
  },
  async setup(options: CodegenModuleOptions, nuxt: NuxtApp) {
    async function generateCode() {
      const start = Date.now();
      const config = (await loadContext()).getConfig();
      await generate(config, true);
      const time = Date.now() - start;
      consola.success(`GraphQL code generated in ${time}ms`);
    }

    nuxt.hook("build:before", generateCode);
    nuxt.hook("builder:watch", generateCode);
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    graphqlCodegen?: CodegenModuleOptions
  }
  interface NuxtOptions {
    graphqlCodegen?: CodegenModuleOptions
  }
}