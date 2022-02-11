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
		const data = await db.authors.where('songCount').aboveOrEqual(1).reverse().sortBy('songCount');

		return data;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Forfattere</title>
</svelte:head>

{#if $data}
	<div class="max-w-4xl mx-auto">
		<CardGrid xlCols={2}>
			<PaginatedList data={$data} let:data={indexedData} show={15} page={0}>
				<Card
					subPath={'forfattere'}
					path={indexedData.name}
					content={indexedData.name}
					badgeContent={indexedData.songCount > 1
						? `${indexedData.songCount} sange`
						: `${indexedData.songCount} sang`}
				/>
			</PaginatedList>
		</CardGrid>
	</div>
{/if}
