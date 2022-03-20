<script>
	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import CardGrid from './CardGrid.svelte';
	import Card from './SongCard.svelte';
	import Carousel from './Carousel.svelte';
	import CarouselItem from './CarouselItem.svelte';
	import SubHeader from './SubHeader.svelte';
	import SkeletonSubHeader from './Skeleton/SubHeader.svelte';
	import SongCard from './Skeleton/SongCard.svelte';

	export let category;
	$: songs = liveQuery(async () => {
		const songs = await db.songs
			.orderBy('views')
			.filter((song) => song.categori_id == category.id)
			.reverse()
			.limit(6)
			.toArray();
		console.log(songs);
		return songs;
	});
</script>

{#if $songs?.length}
	<SubHeader center={false}>Kategori: {category.name}</SubHeader>
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
{:else}
	<div class="hidden md:block">
		{#each Array(5) as _, i}
			<SkeletonSubHeader />
			<CardGrid>
				{#each Array(6) as _, i}
					<SongCard />
				{/each}
			</CardGrid>
		{/each}
	</div>
	<div class="block md:hidden">
		{#each Array(5) as _, i}
			<SkeletonSubHeader />
			<Carousel>
				{#each Array(6) as _, i}
					<CarouselItem>
						<SongCard />
					</CarouselItem>
				{/each}
			</Carousel>
		{/each}
	</div>
{/if}
