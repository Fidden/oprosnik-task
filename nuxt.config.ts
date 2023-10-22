// https://nuxt.com/docs/api/configuration/nuxt-config
import animate from 'tailwindcss-animate';


export default defineNuxtConfig({
	modules: [
		'nuxt-mvvm',
		'@nuxtjs/tailwindcss'
	],
	srcDir: 'src/',
	devtools: {enabled: true},
	components: [
		{
			path: '~/client/shared/components',
			// this is required else Nuxt will autoImport `.ts` file
			extensions: ['.vue'],
			// prefix for your components, eg: UiButton
			prefix: 'Ui'
		}
	]
});
