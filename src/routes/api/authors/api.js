import supabase from '$data/_db.js';

export async function getAuthors(request) {
	const { data, error, status } = await supabase.from('authors').select(`
	id, name
`);
	if (error) console.log('error', error);

	if (
		status === 200 &&
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
		status: status,
		body: data
	};
}
