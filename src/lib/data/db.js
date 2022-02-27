/* eslint-disable @typescript-eslint/ban-ts-comment */
import Dexie from 'dexie';
import { isOnline } from './misc';
const doDeleteDb = false;

export const db = new Dexie('localSongs');
db.version(1).stores({
	authors: 'id, name, songCount',
	song_authors: 'id, song_id, author_id',
	categories: 'id, name, songCount',
	songs: 'id, number, name, text, melody, categori_id, views',
	likes: 'id'
});

async function getData(path) {
	const res = await self.fetch(path);

	if (res.ok) {
		const data = await res.json();
		return data;
	}

	const { message } = await res.json();

	return {
		error: new Error(message)
	};
}

function addCategorySongCount(songs, categories) {
	categories.forEach((category) => {
		let filtered = songs.filter((song) => song.categori_id === category.id);
		category.songCount = filtered.length;
	});
	return categories;
}

function addAuthorSongCount(authors, song_authors) {
	authors.forEach((author) => {
		let filtered = song_authors.filter((song_author) => song_author.author_id === author.id);
		author.songCount = filtered.length;
	});
	return authors;
}

function deleteDb() {
	if (doDeleteDb) {
		console.log('Purging DB');
		db.delete()
			.then(() => db.open())
			.finally(() => {
				return true;
			});
	}
	return true;
}

export default async function createLocalDatabase() {
	if (isOnline) {
		const songs = await getData('/api/songs.json');
		const songAuthors = await getData('/api/song-author.json');
		let authors = await getData('/api/authors.json');
		let categories = await getData('/api/categories.json');
		if (songs && authors && categories && deleteDb) {
			categories = addCategorySongCount(songs, categories);
			authors = addAuthorSongCount(authors, songAuthors);
			//Songs
			// @ts-ignore
			await db.songs
				.bulkPut(songs)
				.then(function (lastKey) {
					console.log(`${lastKey} songs loaded`);
				})
				.catch((err) => {
					console.log('songs could not be loaded');
				});
			//Categories
			// @ts-ignore
			await db.categories
				.bulkPut(categories)
				.then(function (lastKey) {
					console.log(`${lastKey} categories loaded`);
				})
				.catch((err) => {
					console.log('categories could not be loaded');
				});
			//Authors
			// @ts-ignore
			await db.authors
				.bulkPut(authors)
				.then(function (lastKey) {
					console.log(`${lastKey} authors loaded`);
				})
				.catch((err) => {
					console.log('authors could not be loaded');
				});
			//Song-author
			// @ts-ignore
			await db.song_authors
				.bulkPut(songAuthors)
				.then(function (lastKey) {
					console.log(`${lastKey} song_authors loaded`);
				})
				.catch((err) => {
					console.log('authors could not be loaded');
				});
		}
		//TODO: Add error to frontend
	}
}
