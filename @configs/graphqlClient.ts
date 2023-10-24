import type {NuxtConfig} from 'nuxt/schema';

export const graphqlClient: NuxtConfig['graphql-client'] = {
	autoImport: true,
	codegen: {
		onlyOperationTypes: false,
		disableOnBuild: false,
	}
};
