<script lang="ts">
	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/CompactCard.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	$: data = liveQuery(async () => {
		const data = await db.categories.toArray();

		return data;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Kategorier</title>
</svelte:head>

{#if $data}
	<div class="max-w-4xl mx-auto">
		<CardGrid xlCols={2}>
			<PaginatedList data={$data} let:data={indexedData} page={0}>
				<Card
					subPath={'kategorier'}
					path={indexedData.name}
					content={indexedData.name}
					badgeContent={`${indexedData.songCount} sange`}
				/>
			</PaginatedList>
		</CardGrid>
	</div>
{/if}
