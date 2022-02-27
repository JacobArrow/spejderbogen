<script lang="ts">
	//Functions
	import { page } from '$app/stores';
	import { decode } from '$functions/convertUrl';

	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/SongCard.svelte';
	import Header from '$components/Header.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';
import { incrementCategory } from '$functions/increment';

	const slug = decode($page.params.slug);

	$: data = liveQuery(async () => {
		const category = await db.categories.where('name').equalsIgnoreCase(slug).first();
		const songs = await db.songs.where('categori_id').equals(category.id).toArray();
		incrementCategory(category.id);
		return { category, songs };
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Sange</title>
</svelte:head>

{#if $data}
	<Header>Kategori: {$data.category.name}</Header>
	<CardGrid>
		<PaginatedList data={$data.songs} let:data={indexedData} page={0}>
			<Card song={indexedData} />
		</PaginatedList>
	</CardGrid>
{/if}
