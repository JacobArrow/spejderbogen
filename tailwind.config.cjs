const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}', './safelist.txt'],

	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens
		},
		colors: {
			'error-focus': '#9f0324',
		  },
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/line-clamp'),
		require('daisyui'),
		require('tailwind-safelist-generator')({
			patterns: ['{screens}:grid-cols-{columns}']
		})
	],
	important: true,
	daisyui: {
		themes: [
			'light',
			'dark',
			{
				dark: {
					primary: '#023968',
					'primary-focus': '#04213a',
					'primary-content': '#ffffff',
					secondary: '#00a0d1',
					'secondary-focus': '#00789d',
					'secondary-content': '#ffffff',
					accent: '#37cdbe',
					'accent-focus': '#2aa79b',
					'accent-content': '#ffffff',
					neutral: '#2a2e37',
					'neutral-focus': '#16181d',
					'neutral-content': '#ffffff',
					'base-100': '#3d4451',
					'base-200': '#2a2e37',
					'base-300': '#16181d',
					'base-content': '#ebecf0',
					info: '#00A0D1',
					success: '#7eb300',
					warning: '#e2d562',
					error: '#C1002B',
					'error-content': '#ffffff',
					'input-icon': '#ffffff',
					'--border-color': 'var(--b3)',
					'--rounded-box': '1rem',
					'--rounded-btn': '0.5rem',
					'--rounded-badge': '1.9rem',
					'--animation-btn': '0.25s',
					'--animation-input': '.2s',
					'--btn-text-case': 'uppercase',
					'--btn-focus-scale': '0.95',
					'--navbar-padding': '.5rem',
					'--border-btn': '1px',
					'--tab-border': '1px',
					'--tab-radius': '0.5rem'
				},
				light: {
					primary: '#023968',
					'primary-focus': '#04213a',
					'primary-content': '#ffffff',
					secondary: '#00a0d1',
					'secondary-focus': '#00789d',
					'secondary-content': '#ffffff',
					accent: '#37cdbe',
					'accent-focus': '#2aa79b',
					'accent-content': '#ffffff',
					neutral: '#3d4451',
					'neutral-focus': '#2a2e37',
					'neutral-content': '#ffffff',
					'base-100': '#ffffff',
					'base-200': '#f9fafb',
					'base-300': '#d1d5db',
					'base-content': '#1f2937',
					info: '#00A0D1',
					success: '#7eb300',
					warning: '#ff9900',
					error: '#C1002B',
					'error-content': '#ffffff',
					'input-icon': '#023968',
					'--border-color': 'var(--b3)',
					'--rounded-box': '1rem',
					'--rounded-btn': '0.5rem',
					'--rounded-badge': '1.9rem',
					'--animation-btn': '0.25s',
					'--animation-input': '.2s',
					'--btn-text-case': 'uppercase',
					'--btn-focus-scale': '0.95',
					'--navbar-padding': '.5rem',
					'--border-btn': '1px',
					'--tab-border': '1px',
					'--tab-radius': '0.5rem'
				}
			}
		]
	}
};

module.exports = config;
