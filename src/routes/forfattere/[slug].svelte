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

	const slug = decode($page.params.slug);

	$: data = liveQuery(async () => {
		const author = await db.authors.where('name').equalsIgnoreCase(slug).first();
		const authors = await db.song_authors.where('author_id').equals(author.id).toArray();
		const songIds = authors.map(function (author) {
			return author['song_id'];
		});
		const songs = await db.songs.where('id').anyOf(songIds).toArray();

		return { songs, author };
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex nofollow" />
	<title>{DEFAULT_TITLE} - Sange</title>
</svelte:head>

{#if $data}
	<Header>Sange af {$data.author.name}</Header>
	<CardGrid>
		<PaginatedList data={$data.songs} let:data={indexedData} page={0}>
			<Card song={indexedData} />
		</PaginatedList>
	</CardGrid>
{/if}
