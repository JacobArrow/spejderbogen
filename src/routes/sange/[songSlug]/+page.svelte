<script>
	//Functions
	import { page } from '$app/stores';
	import { decode, encode } from '$functions/convertUrl';
	import { goto } from '$app/navigation';
	import { incrementCategory, incrementSong } from '$functions/increment';

	//Components
	import Song from '$components/Song.svelte';
	import Pagination from '$components/Pagination.svelte';

	//Icons
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';
	import Card from '$components/Card.svelte';

	$: slug = decode($page.params.songSlug);
	$: listId = $page.url.searchParams.get('list');

	$: paginationCount = () => {
		if ($listData?.songs) return $listData.songs.length;
		if ($songs) return $songs.length - 2;
	};

	$: songNumber = () => {
		if ($listData?.songs && $song) {
			return $listData.songs.findIndex((listSong) => listSong.number === $song.number) + 1;
		}
		if ($song) {
			return $song.number;
		}
		return 0;
	};

	$: params = () => {
		if ($listData) return `?list=${$listData.list.id}`;
		return '';
	};

	async function pagination(event) {
		var songNumber = $listData ? $listData.songs[event.detail.page - 1].number : event.detail.page;

		const song = await db.songs.where('number').equals(songNumber).first();
		if (encode(song.name) !== slug)
			goto(`${encode(song.name)}${params()}`, { replaceState: false });
	}

	$: songs = liveQuery(async () => {
		const songs = await db.songs.toArray();
		return songs;
	});

	$: song = liveQuery(async () => {
		if ($songs) {
			const song = await db.songs.where('name').equalsIgnoreCase(slug).first();
			incrementSong(song.id);
			incrementCategory(song.categori_id);
			return song;
		}
	});

	$: listData = liveQuery(async () => {
		const list = await db.lists.where('id').equals(parseInt(listId)).first();
		const songs = await db.songs.bulkGet(list.ids);
		return { songs, list };
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex nofollow" />
	<title>{DEFAULT_TITLE} - {slug.charAt(0).toUpperCase() + slug.slice(1)}</title>
</svelte:head>

<div class="mx-auto max-w-2xl">
	{#if $listData}
		<p class="my-0 mb-3">
			<a href="/lister/{$listData.list.id}" class="btn btn-primary gap-1">
				<ArrowLeft size="18px" />Tilbage til listen
			</a>
		</p>
	{/if}
	{#if $song}
		<Song song={$song} />
		{#if $songs}
			<div class="fixed bottom-12 sm:bottom-16 left-2/4 -translate-x-2/4 xl:col-span-full">
				<Pagination
					on:clicked={pagination}
					count={paginationCount()}
					page={songNumber()}
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
