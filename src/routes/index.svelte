<script>
	import Card from '$components/SongCard.svelte';
	import { DEFAULT_TITLE } from '$data/env';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import PopularSongs from '$components/PopularSongs.svelte';
	import Header from '$components/Header.svelte';

	$: categories = liveQuery(async () => {
		const categories = (await db.categories.reverse().sortBy('views')).slice(0, 4);
		return categories;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Forside</title>
</svelte:head>

<Header>Populære sange</Header>
{#if $categories}
	{#each $categories as category}
		<PopularSongs {category} />
	{/each}
{/if}