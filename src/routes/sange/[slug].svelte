<script>
	//Functions
	import { page } from '$app/stores';
	import { decode } from '$functions/convertUrl';

	//Components
	import Song from '$components/Song.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';

	const slug = decode($page.params.slug);

	$: song = liveQuery(async () => {
		const song = await db.songs.where('name').equalsIgnoreCase(slug).first();
		console.log(song);
		return song;
	});
</script>

<svelte:head>
	<title>{import.meta.env.VITE_DEFAULT_TITLE} - {slug}</title>
</svelte:head>

{#if $song}
	<div class="mx-auto max-w-2xl">
		<Song song={$song} />
	</div>
{/if}
