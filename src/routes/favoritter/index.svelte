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

	$: likes = liveQuery(async () => {
		return await db.likes.toArray();
	});

	$: songs = liveQuery(async () => {
		if ($likes) {
			console.log($likes);
			return await db.songs
				.where('id')
				.anyOf($likes.map(({ id }) => id))
				.toArray();
		}
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Favoritter</title>
</svelte:head>

<Header>Dine favoritter</Header>
{#if $songs}
	{#if $songs?.length}
		<CardGrid>
			<PaginatedList data={$songs} let:data={indexedData} page={0}>
				<Card song={indexedData} />
			</PaginatedList>
		</CardGrid>
	{:else}
		<p class="text-center">Du har ingen favoritter</p>
	{/if}
{/if}
