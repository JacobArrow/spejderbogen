<script lang="ts">
	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/CompactCard.svelte';
	import Header from '$components/Header.svelte';
	import CompactCard from '$components/Skeleton/CompactCard.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	$: authors = liveQuery(async () => {
		const data = await db.authors.where('songCount').aboveOrEqual(1).reverse().sortBy('songCount');

		return data;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Forfattere</title>
</svelte:head>

<Header>Alle forfattere</Header>
<div class="max-w-4xl mx-auto">
	<CardGrid xlCols={2}>
		{#if $authors?.length}
			<PaginatedList data={$authors} let:data={indexedData} show={16} page={0}>
				<Card
					subPath={'forfattere'}
					path={indexedData.name}
					content={indexedData.name}
					badgeContent={indexedData.songCount > 1
						? `${indexedData.songCount} sange`
						: `${indexedData.songCount} sang`}
				/>
			</PaginatedList>
		{:else}
			{#each Array(16) as _, i}
				<CompactCard />
			{/each}
		{/if}
	</CardGrid>
</div>
<div class="mb-14 sm:mb-8 xl:mb-0" />

