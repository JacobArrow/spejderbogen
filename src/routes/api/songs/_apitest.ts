import supabase from '$data/db.js';

export async function api(request) {
	const { getPaginatedResults } = await import('$functions/pagination');
	const { props } = await getPaginatedResults();
	if (
		props.status === 200 &&
		request.method !== 'GET' &&
		request.headers.accept !== 'application/json'
	) {
		return {
			status: 303,
			headers: {
				location: '/'
			}
		};
	}

	return {
		status: props.status,
		body: props
	};
}
