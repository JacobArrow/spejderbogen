<script>
	//Functions
	import { page } from '$app/stores';
	import { decode, encode } from '$functions/convertUrl';
	import { goto } from '$app/navigation';

	//Components
	import Song from '$components/Song.svelte';
	import Pagination from '$components/Pagination.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';
	$: songNumber = $songId;

	let slug = decode($page.params.slug);

	$: songId = liveQuery(async () => {
		const song = await db.songs.where('name').equalsIgnoreCase(slug).first();
		return song.number;
	});

	$: song = liveQuery(async () => {
		const song = await db.songs.where('number').equals(songNumber).first();
		if (encode(song.name) !== slug) goto(`${encode(song.name)}`, { replaceState: true });
		return song;
	});

	$: songs = liveQuery(async () => {
		const songs = await db.songs.toArray();
		return songs;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - {slug}</title>
</svelte:head>

{#if $song}
	<div class="mx-auto max-w-2xl">
		<Song song={$song} />
		{#if $songs}
			<div
				class="fixed xl:relative xl:flex xl:justify-center bottom-4 sm:bottom-10 xl:bottom-0 left-2/4 -translate-x-2/4 xl:col-span-full xl:mt-8"
			>
				<Pagination count={$songs.length} bind:page={songNumber} show={1} offset={0} />
			</div>
			<div class="mb-16 xl:mb-0" />
		{/if}
	</div>
{/if}
