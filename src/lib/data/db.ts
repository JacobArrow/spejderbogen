import Dexie, { type Table, liveQuery as dexieLiveQuery } from 'dexie';
import { browser } from '$app/environment';
import { readable } from 'svelte/store';

const doDeleteDb = false;

// Define types for your database tables
export type Author = {
	id: number;
	name: string;
	songCount?: number;
};

export type SongAuthor = {
	id: number;
	song_id: number;
	author_id: number;
};

export type Category = {
	id: number;
	name: string;
	songCount?: number;
	views?: number;
};

export type Song = {
	id: number;
	number: number;
	name: string;
	text: string;
	melody?: string;
	categori_id: number;
	views?: number;
};

export type Like = {
	id: number;
};

export type List = {
	id?: number;
	name: string;
	ids: number[];
	fromShare?: boolean;
	guid?: string;
};

// Extend Dexie with typed tables
export class LocalSongsDB extends Dexie {
	authors!: Table<Author, number>;
	song_authors!: Table<SongAuthor, number>;
	categories!: Table<Category, number>;
	songs!: Table<Song, number>;
	likes!: Table<Like, number>;
	lists!: Table<List, number>;

	constructor() {
		super('localSongs');

		this.version(1).stores({
			authors: 'id, name, songCount',
			song_authors: 'id, song_id, author_id',
			categories: 'id, name, songCount, views',
			songs: 'id, number, name, text, melody, categori_id, views',
			likes: '&id'
		});

		this.version(2).stores({
			authors: 'id, name, songCount',
			song_authors: 'id, song_id, author_id',
			categories: 'id, name, songCount, views',
			songs: 'id, number, name, text, melody, categori_id, views',
			likes: '&id'
		});

		this.version(3).stores({
			authors: 'id, name, songCount',
			song_authors: 'id, song_id, author_id',
			categories: 'id, name, songCount, views',
			songs: 'id, number, name, text, melody, categori_id, views',
			likes: '&id',
			lists: '++id, name, &guid'
		});
	}
}

export const db = new LocalSongsDB();

/**
 * Browser-safe wrapper for Dexie's liveQuery that prevents SSR errors.
 * Returns undefined during SSR and the actual liveQuery result in the browser.
 */
export function liveQuery<T>(querier: () => Promise<T>) {
	if (!browser) {
		return readable<T | undefined>(undefined);
	}
	return dexieLiveQuery(querier);
}

async function getData(path: string) {
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

function addCategorySongCount(songs: Song[], categories: Category[]) {
	categories.forEach((category) => {
		const filtered = songs.filter((song) => song.categori_id === category.id);
		category.songCount = filtered.length;
	});
	return categories;
}

function addAuthorSongCount(authors: Author[], song_authors: SongAuthor[]) {
	authors.forEach((author) => {
		const filtered = song_authors.filter((song_author) => song_author.author_id === author.id);
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

export async function hasLocalData(): Promise<boolean> {
	if (!browser) return false;
	const count = await db.songs.count();
	return count > 0;
}

export default async function createLocalDatabase(): Promise<{ synced: boolean }> {
	if (!browser || !navigator.onLine) {
		return { synced: false };
	}

	try {
		const songs = await getData('/api/songs');
		const songAuthors = await getData('/api/song-author');
		let authors = await getData('/api/authors');
		let categories = await getData('/api/categories');

		if (songs?.error || authors?.error || categories?.error || songAuthors?.error) {
			console.warn('API returned errors during sync, skipping DB update');
			return { synced: false };
		}

		if (songs && authors && categories && songAuthors) {
			deleteDb();
			categories = addCategorySongCount(songs, categories);
			authors = addAuthorSongCount(authors, songAuthors);
			await db.transaction(
				'rw',
				db.songs,
				db.categories,
				db.authors,
				db.song_authors,
				async () => {
					await db.songs.bulkPut(songs);
					await db.categories.bulkPut(categories);
					await db.authors.bulkPut(authors);
					await db.song_authors.bulkPut(songAuthors);
				}
			);
			console.log('Database synced successfully');
			return { synced: true };
		}
	} catch (err) {
		console.warn('Offline or sync failed, using cached data:', err);
	}

	return { synced: false };
}
