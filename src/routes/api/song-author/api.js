import supabase from '$data/_db.js';

export async function getSongAuthor(request) {
	const { data, error, status } = await supabase.from('song_author').select(`
	id, song_id, author_id
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
