import { defineNuxtModule } from '@nuxt/kit';
import { loadContext, generate } from '@graphql-codegen/cli';
import consola from 'consola';
import defu from 'defu';

const index = defineNuxtModule({
  meta: {
    name: "@nuxt3/graphql-codegen-module",
    configKey: "graphqlCodegen"
  },
  async setup(options, nuxt) {
    async function generateCode() {
      const start = Date.now();
      const xmlConfig = (await loadContext()).getConfig();
      const config = defu(options, xmlConfig);
      await generate(config, true);
      const time = Date.now() - start;
      consola.success(`GraphQL code generated in ${time}ms`);
    }
    if (options.watch) {
      nuxt.hook("builder:watch", generateCode);
    }
  }
});

export { index as default };
