<script>
	import { DEFAULT_TITLE } from '$data/env';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import PopularSongs from '$components/PopularSongs.svelte';
	import Header from '$components/Header.svelte';
	import SubHeader from '$components/Skeleton/SubHeader.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import SongCard from '$components/Skeleton/SongCard.svelte';

	$: categories = liveQuery(async () => {
		const categories = (
			await db.categories.where('id').noneOf([1, 6, 8]).reverse().sortBy('views')
		).slice(0, 5);
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
{:else}
	{#each Array(5) as _, i}
		<SubHeader />
		<CardGrid>
			{#each Array(6) as _, i}
				<SongCard />
			{/each}
		</CardGrid>
	{/each}
{/if}
