import {graphqlClient} from './@configs/graphqlClient';

export default defineNuxtConfig({
	app: {
		head: {
			title: 'Arora | Metrics',
			link: [
				{rel: 'preconnect', href: 'https://fonts.googleapis.com'},
				{rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap'
				}
			]
		}
	},
	modules: [
		'nuxt-mvvm',
		'nuxt-graphql-client',
		'nuxt-icon'
	],
	srcDir: 'src/',
	devtools: {enabled: true},
	'graphql-client': graphqlClient
});
