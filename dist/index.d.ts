import * as _nuxt_schema from '@nuxt/schema';
import { Types } from '@graphql-codegen/plugin-helpers';

type CodegenModuleOptions = Types.Config;
declare const _default: _nuxt_schema.NuxtModule<Types.Config>;

declare module '@nuxt/schema' {
    interface NuxtConfig {
        graphqlCodegen?: Partial<CodegenModuleOptions>;
    }
    interface NuxtOptions {
        graphqlCodegen?: Partial<CodegenModuleOptions>;
    }
}

export { _default as default };
