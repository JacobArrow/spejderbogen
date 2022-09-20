<script>
	import { DEFAULT_TITLE } from '$data/env';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import PopularSongs from '$components/PopularSongs.svelte';
	import Header from '$components/Header.svelte';
	import SubHeader from '$components/Skeleton/SubHeader.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import SongCard from '$components/Skeleton/SongCard.svelte';
	import Carousel from '$components/Carousel.svelte';
	import CarouselItem from '$components/CarouselItem.svelte';

	$: categories = liveQuery(async () => {
		const categories = await db.categories
			.where('id')
			.noneOf([1, 6, 8])
			.reverse()
			.sortBy('views')
			.then(async function (categories) {
				categories = categories.slice(0, 5);
				for (let i = 0; i < categories.length; i++) {
					categories[i].songs = await db.songs
					.orderBy('views')
					.filter((song) => song.categori_id == categories[i].id)
					.reverse()
					.limit(6)
					.toArray();
				};
				return categories;
			});
		return categories;
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Forside</title>
</svelte:head>

<Header>Populære sange</Header>
{#if $categories?.length}
	{#each $categories as category}
		<PopularSongs {category} />
	{/each}
{:else}
	<div class="hidden md:block">
		{#each Array(5) as _}
			<SubHeader />
			<CardGrid>
				{#each Array(6) as _}
					<SongCard />
				{/each}
			</CardGrid>
		{/each}
	</div>
	<div class="block md:hidden">
		{#each Array(5) as _}
			<SubHeader />
			<Carousel>
				{#each Array(6) as _}
					<CarouselItem>
						<SongCard />
					</CarouselItem>
				{/each}
			</Carousel>
		{/each}
	</div>
{/if}
