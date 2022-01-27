import Dexie from 'dexie';
import { isOnline } from './misc';

export const db = new Dexie('localSongs');
db.version(1).stores({
	songs: 'id, number, name, tekst, categories, authors'
});

async function getData() {
	const res = await self.fetch('/api/songs.json');

	if (res.ok) {
		const data = await res.json();
		return data;
	}

	const { message } = await res.json();

	return {
		error: new Error(message)
	};
}

export default async function createLocalDatabase() {
	if (!isOnline) {
		const data = await getData();
		db.songs
			.bulkPut(data)
			.then(function (lastKey) {
				console.log(`${lastKey} records added`);
			})
			.catch(Dexie.BulkError, function (e) {
				console.log('data could not be added');
			});
	}
}
