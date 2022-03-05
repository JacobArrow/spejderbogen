<script lang="ts">
	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/SongCard.svelte';
	import Header from '$components/Header.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';
	import SongCard from '$components/Skeleton/SongCard.svelte';

	$: songs = liveQuery(async () => {
		const songs = await db.songs.toArray();

		return songs;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Sange</title>
</svelte:head>

<Header>Alle sange</Header>
<CardGrid>
	{#if $songs}
		<PaginatedList data={$songs} let:data={indexedData} page={0}>
			<Card song={indexedData} />
		</PaginatedList>
	{:else}
		{#each Array(9) as _, i}
			<SongCard />
		{/each}
	{/if}
</CardGrid>
