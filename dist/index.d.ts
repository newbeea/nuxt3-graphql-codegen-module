import * as _nuxt_schema from '@nuxt/schema';
import { Types } from '@graphql-codegen/plugin-helpers';

declare type CodegenModuleOptions = Types.Config;
declare const _default: _nuxt_schema.NuxtModule<Types.Config>;

declare module '@nuxt/schema' {
    interface NuxtConfig {
        graphqlCodegen?: CodegenModuleOptions;
    }
    interface NuxtOptions {
        graphqlCodegen?: CodegenModuleOptions;
    }
}

export { _default as default };
