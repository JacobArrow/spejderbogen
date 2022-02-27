import { incrementViews } from './_api';

export const post = async (request) => {
	const response = await incrementViews(request);

	if (response.status === 404 || response.status === 500) {
		return { body: [] };
	}

	return response;
};
