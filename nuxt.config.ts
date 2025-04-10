import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },
	css: ['~/assets/css/tailwind.css'],

	vite: {
		plugins: [tailwindcss()],
	},

	modules: [
		'shadcn-nuxt',
		'@nuxt/image',
		[
			'@nuxtjs/google-fonts',
			{
				families: {
					Lato: {
						wght: [300, 400, 700],
						ital: [300],
					},
				},
			},
		],
		'@nuxt/icon',
		'@pinia/nuxt',
	],

	ssr: false,

	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: './components/ui',
	},

	pinia: {
		storesDirs: ['./stores/**', './custom-folder/stores/**'],
	},
})
