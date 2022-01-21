import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({})],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/lib/components'),
					$data: path.resolve('./src/lib/data'),
					$functions: path.resolve('./src/lib/functions')
				}
			}
		}
	}
};

export default config;
