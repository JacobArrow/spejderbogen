import { error } from '@sveltejs/kit';
import { incrementViews } from '../api';

export async function POST({ request }) {
	const response = await incrementViews(request);

	if (response.status === 404 || response.status === 500) {
		throw error(404, 'Page not found');
	}

	return new Response(JSON.stringify(response.body));
  }