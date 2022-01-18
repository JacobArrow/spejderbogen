const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens
		}
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
		require('daisyui')
	],
	important: true,
	daisyui: {
		themes: ['light', 'dark']
	}
};

module.exports = config;
