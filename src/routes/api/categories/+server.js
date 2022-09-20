import { error } from '@sveltejs/kit';
import { getCategories } from './api';

export async function GET({ request }) {
	const response = await getCategories(request);

	if (response.status === 404 || response.status === 500) {
		throw error(404, 'Page not found');
	}

	return new Response(JSON.stringify(response.body));
}