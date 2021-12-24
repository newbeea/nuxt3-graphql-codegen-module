# @nuxt3/graphql-codegen-module

Nuxt3 module for graphql code generator


## Installation

```bash
npm i -D @nuxt3/graphql-codegen-module @graphql-codegen/cli graphql
```
install graphql code generator plugin like @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-vue-apollo

## Configuration
```js
// nuxt.config.js
import '@nuxt3/graphql-codegen-module' // import to remove config warning, not necessary
export default {
  buildModules: [
    '@nuxt3/graphql-codegen-module'
  ],
  graphqlCodegen: {
  }
}
```

## Usage
write codegen.yml in root folder
For example:
```
schema: generated/schema.graphql
documents: graphql/**/*.graphql
generates:
  generated/schema.d.ts:
    plugins:
      - typescript
  generated/operations.ts:
    config:
      documentMode: documentNode
    plugins:
      - typescript
      - typescript-operations
      - typescript-vue-apollo
```
Code will be generated to generated/operations.ts:
```
// types
// operation code
// like:
/**
 * __useCountryQuery__
 *
 * To run a query within a Vue component, call `useCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCountryQuery();
 */
export function useCountryQuery(options: VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CountryQuery, CountryQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CountryQuery, CountryQueryVariables>(CountryDocument, {}, options);
}
export type CountryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CountryQuery, CountryQueryVariables>;


```

you can use it with [@nuxt3/apollo-module](https://github.com/newbeea/nuxt3-apollo-module) like this:

```
import { useCountryQuery } from '@/generated/operations'
const { result, loading, error } = await useCountryQuery()

```

## Dev

```
pnpm i
```

```
pnpm run build
```



## License

MIT License © 2021-PRESENT [Phil xu](https://github.com/newbeea)
