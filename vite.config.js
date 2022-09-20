import { sveltekit } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';
import path from 'path';

const config = {
    plugins: [
        sveltekit({
            preprocess: [
                preprocess({
                    postcss: true
                })
            ],
        })
    ],
    resolve: {
        alias: {
            $components: path.resolve('./src/lib/components'),
            $data: path.resolve('./src/lib/data'),
            $functions: path.resolve('./src/lib/functions')
        }
    }
};

export default config;