<script>
	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import CardGrid from './CardGrid.svelte';
	import Card from './SongCard.svelte';
	import Carousel from './Carousel.svelte';
	import CarouselItem from './CarouselItem.svelte';
import SubHeader from './SubHeader.svelte';

	export let category;

	$: songs = liveQuery(async () => {
		const songs = (
			await db.songs.where('categori_id').equals(category.id).reverse().sortBy('views')
		).slice(0, 6);
		return songs;
	});
</script>

<SubHeader center={false}>Kategori: {category.name}</SubHeader>
{#if $songs}
<div class="hidden md:block">
	<CardGrid>
		{#each $songs as song (song.id)}
			<Card {song} />
		{/each}
	</CardGrid>
</div>
<div class="block md:hidden">
	<Carousel>
		{#each $songs as song (song.id)}
			<CarouselItem>
				<Card {song} />
			</CarouselItem>
		{/each}
	</Carousel>
</div>
{/if}
