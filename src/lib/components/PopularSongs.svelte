<script>
	//Components
	import CardGrid from './CardGrid.svelte';
	import Card from './SongCard.svelte';
	import Carousel from './Carousel.svelte';
	import CarouselItem from './CarouselItem.svelte';
	import SubHeader from './SubHeader.svelte';

	export let category;
</script>

<SubHeader center={false}>Kategori: {category.name}</SubHeader>
<div class="hidden md:block">
	<CardGrid>
		{#each category.songs as song (song.id)}
			<Card {song} />
		{/each}
	</CardGrid>
</div>
<div class="block md:hidden">
	<Carousel>
		{#each category.songs as song (song.id)}
			<CarouselItem>
				<Card {song} />
			</CarouselItem>
		{/each}
	</Carousel>
</div>
