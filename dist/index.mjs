import { defineNuxtModule } from '@nuxt/kit';
import { loadContext, generate } from '@graphql-codegen/cli';
import consola from 'consola';

const index = defineNuxtModule({
  meta: {
    name: "@nuxt3/graphql-codegen-module",
    configKey: "graphqlCodegen"
  },
  async setup(options, nuxt) {
    async function codegenGenerateTypings() {
      const start = Date.now();
      const config = (await loadContext()).getConfig();
      await generate(config, true);
      const time = Date.now() - start;
      consola.success(`GraphQL typings generated in ${time}ms`);
    }
    nuxt.hook("build:before", codegenGenerateTypings);
    nuxt.hook("builder:watch", codegenGenerateTypings);
  }
});

export { index as default };
