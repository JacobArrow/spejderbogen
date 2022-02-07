import supabase from '$data/_db.js';

export async function api(request) {
	const { data, error, status } = await supabase.from('categories').select(`
	id, name
`);
	if (error) console.log('error', error);

	if (
		status === 200 &&
		request.request.method !== 'GET' &&
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
		status: status,
		body: data
	};
}
