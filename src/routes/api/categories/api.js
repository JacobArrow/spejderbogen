import supabase from '$data/_db.js';

export async function getCategories(request) {
	const { data, error, status } = await supabase.from('categories').select(`
	id, name, views
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

export async function incrementViews(request) {
	if (request.method !== 'POST' && request.headers.accept !== 'application/json') {
		return {
			status: 303,
			headers: {
				location: '/'
			}
		};
	}
	const data = await request.json();
	const { error, status } = await supabase.rpc('increment_category_views', {
		categoryid: data.categoryid
	});
	if (error) console.log('error', error);

	return {
		status: status,
		body: data
	};
}
