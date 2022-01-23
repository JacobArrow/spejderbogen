import supabase from '$data/db.js';

export const getPagination = (page, size) => {
	const limit = size ? +size : 3;
	const from = page ? page * limit : 0;
	const to = page ? from + size : size;

	return { from, to };
};

export const getPaginationRange = (current, { min = 0, total = 10, length = 5 } = {}) => {
	if (length > total) length = total;

	let start = current - Math.floor(length / 2);
	start = Math.max(start, min);
	start = Math.min(start, min + total - length);

	return Array.from({ length: length }, (el, i) => start + i);
};
