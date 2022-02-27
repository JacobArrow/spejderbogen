import { getSongs } from './_api';

export const get = async (request) => {
	const response = await getSongs(request);

	if (response.status === 404 || response.status === 500) {
		return { body: [] };
	}

	return response;
};