'use strict';

const kit = require('@nuxt/kit');
const cli = require('@graphql-codegen/cli');
const consola = require('consola');
const defu = require('defu');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const consola__default = /*#__PURE__*/_interopDefaultLegacy(consola);
const defu__default = /*#__PURE__*/_interopDefaultLegacy(defu);

const index = kit.defineNuxtModule({
  meta: {
    name: "@nuxt3/graphql-codegen-module",
    configKey: "graphqlCodegen"
  },
  async setup(options, nuxt) {
    async function generateCode() {
      const start = Date.now();
      const xmlConfig = (await cli.loadContext()).getConfig();
      const config = defu__default(options, xmlConfig);
      await cli.generate(config, true);
      const time = Date.now() - start;
      consola__default.success(`GraphQL code generated in ${time}ms`);
    }
    if (options.watch) {
      nuxt.hook("builder:watch", generateCode);
    }
  }
});

module.exports = index;
