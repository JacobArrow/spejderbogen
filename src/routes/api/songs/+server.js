import { error } from '@sveltejs/kit';
import { getSongs } from './api.js';

export async function GET({ request }) {
	const response = await getSongs(request);

	if (response.status === 404 || response.status === 500) {
		throw error(404, 'Page not found');
	}

	return new Response(JSON.stringify(response.body));
}