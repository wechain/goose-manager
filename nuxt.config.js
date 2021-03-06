const bodyParser = require('body-parser');
const session = require('express-session');
// get .env
require('dotenv').config();

module.exports = {

	head: {
		title: 'Goose manager',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		],
		link: [
			{ rel: 'shortcut icon', href: '/favicon.ico' },
			{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
		],
	},

	css: [
		'~assets/scss/app.scss'
	],

	build: {
		extractCSS: true,
	},

	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/dotenv'
	],

	plugins: [
		'~/plugins/axios',
		{ src: '~/plugins/toast', ssr: false },
	],

	axios: {
		baseURL: process.env.APP_API_URL,
	},

	loading: {
		color: '#2e9ad1',
	},

	router: {
		base: '/',
		middleware: [ 'hook' ],
		linkActiveClass: 'nuxt-active',
	},

	serverMiddleware: [
		bodyParser.json(),
		session({
			secret: 'super-secret-key',
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 60000 * 60 * 6, // ms * m * h * d
			}
		}),
		'~/api',
	],

};