<script>
	import Pagination from '$components/Pagination.svelte';
	import { setParam, getParam } from '$functions/urlParams';
	import { afterUpdate, onMount } from 'svelte';

	let from;
	let to;
	let y;
	var drawerContent = document.getElementById('drawer-content');
	export let data;
	export let page;
	export let show = 9;
	$: sliced = data.slice(from, to);

	function pagination() {
		y = drawerContent.scrollTop;
	}

	onMount(() => {
		const param = getParam('p');
		if (param) page = parseInt(param);
	});

	afterUpdate(() => {
		if (y) drawerContent.scrollTo(0, y);
		y = null;
		setParam({
			p: page
		});
	});
</script>

{#each sliced as data, i (i)}
	<slot {data} />
{/each}
<div
	class="fixed xl:relative xl:flex xl:justify-center bottom-12 sm:bottom-14 xl:bottom-0 left-2/4 -translate-x-2/4 xl:col-span-full xl:mt-4 z-10"
>
	<Pagination on:clicked={pagination} count={data.length} bind:from bind:to bind:page {show} />
</div>
