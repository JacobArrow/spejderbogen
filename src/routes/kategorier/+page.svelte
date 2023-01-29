<script lang="ts">
	//Components
	import CompactCard from '$components/Skeleton/CompactCard.svelte';
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/CompactCard.svelte';
	import Header from '$components/Header.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	$: categories = liveQuery(async () => {
		const categories = await db.categories.toArray();

		return categories;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Kategorier</title>
</svelte:head>

<Header>Alle kategorier</Header>
<div class="max-w-4xl mx-auto">
	<CardGrid xlCols={2}>
		{#if $categories?.length}
			<PaginatedList data={$categories} let:data={indexedData} page={0} show={16}>
				<Card
					subPath={'kategorier'}
					path={indexedData.name}
					content={indexedData.name}
					badgeContent={`${indexedData.songCount} sange`}
				/>
			</PaginatedList>
		{:else}
			{#each Array(16) as _, i}
				<CompactCard />
			{/each}
		{/if}
	</CardGrid>
</div>
