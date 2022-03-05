import { db } from '$data/db';
import Fuse from 'fuse.js';

const options = {
	// isCaseSensitive: false,
	includeScore: true,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	threshold: 0.45,
	distance: 1000,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,
	// fieldNormWeight: 1,
	keys: [
		{
			name: 'number',
			weight: 1
		},
		{
			name: 'text',
			weight: 0.3
		},
		{
			name: 'name',
			weight: 0.7
		}
	]
};

async function getSongsByText(value) {
	const songs = await db.songs.toArray().then((result) => {
		const fuse = new Fuse(result, options);
		return fuse.search(value);
	});
	return songs;
}

export default function search(value: string) {
	return getSongsByText(value);
}
