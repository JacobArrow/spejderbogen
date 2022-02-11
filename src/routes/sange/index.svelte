<script lang="ts">
	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/SongCard.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	$: data = liveQuery(async () => {
		const data = await db.songs.toArray();

		return data;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Sange</title>
</svelte:head>

{#if $data}
	<CardGrid>
		<PaginatedList data={$data} let:data={indexedData} page={0}>
			<Card song={indexedData} />
		</PaginatedList>
	</CardGrid>
{/if}
