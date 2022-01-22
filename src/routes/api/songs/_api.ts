import supabase from '$data/db.js';

export async function api(request) {
	const { data, error, status } = await supabase.from('songs').select(`
	id, number, name, text,
	categories (id, name),
	authors (id, name)
`);
	if (error) console.log('error', error);

	if (status === 200 && request.method !== 'GET' && request.headers.accept !== 'application/json') {
		return {
			status: 303,
			headers: {
				location: '/'
			}
		};
	}

	return {
		status: status,
		body: data
	};
}
