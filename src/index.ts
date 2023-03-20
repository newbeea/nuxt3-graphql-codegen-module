import { defineNuxtModule } from "@nuxt/kit";
import { generate, loadContext } from "@graphql-codegen/cli";
import consola from "consola";
import type { Types } from "@graphql-codegen/plugin-helpers";
// @ts-expect-error #app resolved by Nuxt3
import { NuxtApp } from '#app'
import defu from "defu";

type CodegenModuleOptions = Types.Config;

export default defineNuxtModule<CodegenModuleOptions>({
  
  meta: {
    name: '@nuxt3/graphql-codegen-module',
    configKey: 'graphqlCodegen',
  },
  async setup(options: CodegenModuleOptions, nuxt: NuxtApp) {
    async function generateCode() {
      const start = Date.now();
      const xmlConfig = (await loadContext()).getConfig()
      const config = defu(options, xmlConfig)
      await generate(config, true);
      const time = Date.now() - start;
      consola.success(`GraphQL code generated in ${time}ms`);
    }

    if (options.watch) {
      nuxt.hook("builder:watch", generateCode);
    }
  },
})

declare module '@nuxt/schema' {
  interface NuxtConfig {
    graphqlCodegen?: Partial<CodegenModuleOptions>
  }
  interface NuxtOptions {
    graphqlCodegen?: Partial<CodegenModuleOptions>
  }
}