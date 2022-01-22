<script>
	import Pagination from '$components/Pagination.svelte';
	import { setParam, getParam } from '$functions/urlParams';
	import { beforeUpdate, afterUpdate, onMount } from 'svelte';

	let from;
	let to;
	let y;
	let setY;
	export let data;
	export let page;

	function pagination() {
		setY = y;
	}

	onMount(() => {
		const param = getParam('p');
		if (param) page = parseInt(param);
	});

	beforeUpdate(() => {});
	afterUpdate(() => {
		if (setY) window.scrollTo(0, setY);
		setY = null;
		setParam({
			p: page
		});
	});
</script>

{#each { length: data.length } as _, i}
	{#if i <= to && i >= from}
		<slot data={data[i]} />
	{/if}
{/each}
<!-- {#each data as song (song.id)}
	{#if song.id <= to && song.id >= from}
		<slot data={song} />
	{/if}
{/each} -->
<div
	class="fixed xl:relative xl:flex xl:justify-center bottom-4 sm:bottom-10 xl:bottom-0 left-2/4 -translate-x-2/4 xl:col-span-full xl:mt-8"
>
	<Pagination on:clicked={pagination} count={data.length} bind:from bind:to bind:page show={11} />
</div>
<div class="mb-12 sm:mb-16 xl:mb-0" />

<svelte:window bind:scrollY={y} />
