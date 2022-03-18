<script>
	//Functions
	import { page } from '$app/stores';
	import { decode, encode } from '$functions/convertUrl';
	import { goto } from '$app/navigation';
	import { incrementCategory, incrementSong } from '$functions/increment';

	//Components
	import Song from '$components/Song.svelte';
	import Pagination from '$components/Pagination.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';
	import Card from '$components/Card.svelte';
	let songNumber = 0;

	$: slug = decode($page.params.slug);

	async function pagination(event) {
		const song = await db.songs.where('number').equals(event.detail.page).first();
		if (encode(song.name) !== slug) goto(`${encode(song.name)}`, { replaceState: false });
	}

	$: songs = liveQuery(async () => {
		const songs = await db.songs.toArray();
		return songs;
	});

	$: song = liveQuery(async () => {
		if ($songs) {
			const song = await db.songs.where('name').equalsIgnoreCase(slug).first();
			songNumber = song.number;
			incrementSong(song.id);
			incrementCategory(song.categori_id);
			return song;
		}
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - {slug}</title>
</svelte:head>

<div class="mx-auto max-w-2xl">
	{#if $song}
		<Song song={$song} />
		{#if $songs}
			<div
				class="fixed bottom-12 sm:bottom-16 left-2/4 -translate-x-2/4 xl:col-span-full"
			>
				<Pagination
					on:clicked={pagination}
					count={$songs.length - 2}
					page={songNumber}
					min={1}
					show={1}
					offset={0}
				/>
			</div>
			<div class="mb-14" />
		{/if}
	{:else}
		<Card>
			<div class="h-80 flex justify-center items-center">
				<div class="btn btn-ghost btn-lg loading before:h-9 before:w-9" />
			</div>
		</Card>
	{/if}
</div>
