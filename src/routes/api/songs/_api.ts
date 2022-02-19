import supabase from '$data/_db.js';

export async function getSongs(request) {
	const { data, error, status } = await supabase.from('songs').select(`
	id, number, name, text, views,
	categories (id, name),
	authors (id, name), categori_id, melody
`);
	if (error) console.log('error', error);

	if (
		status === 200 &&
		request.request.method !== 'GET' &&
		request.request.headers.accept !== 'application/json'
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

export async function incrementViews(request) {
	const headers = request.request.headers;
	console.log("incrementing");
    const { data, error } = await supabase.rpc("test", {
		song_id: 1
		}); 
	if (error) console.log('error', error);
}
