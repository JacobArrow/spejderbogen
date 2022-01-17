<script>
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>{import.meta.env.VITE_DEFAULT_TITLE} - Forside</title>
</svelte:head>

<button class="btn btn-primary">daisyUI Button</button>
<a href="/sange/1">link</a>

<div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-4">
	<Card />
	<Card />
	<Card />
	<Card />
	<Card />
</div>

<div class="carousel carousel-end w-screen">
	<div class="carousel-item w-64 px-2 py-4 ml-3 sm:ml-8">
		<Card />
	</div>
	<div class="carousel-item w-64 px-2 py-4">
		<Card />
	</div>
	<div class="carousel-item w-64 px-2 py-4">
		<Card />
	</div>
	<div class="carousel-item w-64 px-2 py-4 pr-4 sm:pr-10">
		<Card />
	</div>
</div>

<style lang="scss">
	.carousel {
		margin-left: 50%;
		transform: translateX(-50%);
	}
</style>
