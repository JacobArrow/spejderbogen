import { incrementViews } from './_api';

export const post = async (request) => {
	await incrementViews(request);
};