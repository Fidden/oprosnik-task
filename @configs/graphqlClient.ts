import type {NuxtConfig} from 'nuxt/schema';

export const graphqlClient: NuxtConfig['graphql-client'] = {
	autoImport: true,
	codegen: {
		onlyOperationTypes: false,
		disableOnBuild: false,
	},
	clients: {
		default: {
			host: process.env.GQL_PROXY,
			introspectionHost: process.env.GQL_URL
		}
	}
};
