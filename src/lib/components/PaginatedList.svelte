<script>
	import Pagination from '$components/Pagination.svelte';
	import { setParam, getParam } from '$functions/urlParams';
	import { beforeUpdate, afterUpdate, onMount } from 'svelte';

	let from;
	let to;
	let y;
	var drawerContent = document.getElementById('drawer-content');
	export let data;
	export let page;
	export let show = 11;
	$: sliced = data.slice(from, to + 1);

	function pagination() {
		y = drawerContent.scrollTop;
	}

	onMount(() => {
		const param = getParam('p');
		if (param) page = parseInt(param);
	});

	beforeUpdate(() => {});
	afterUpdate(() => {
		if (y) drawerContent.scrollTo(0, y);
		y = null;
		setParam({
			p: page
		});
	});
</script>

{#each sliced as data (data.id)}
	<slot {data} />
{/each}
<div
	class="fixed xl:relative xl:flex xl:justify-center bottom-4 sm:bottom-10 xl:bottom-0 left-2/4 -translate-x-2/4 xl:col-span-full xl:mt-8"
>
	<Pagination on:clicked={pagination} count={data.length} bind:from bind:to bind:page {show} />
</div>
<div class="mb-12 sm:mb-16 xl:mb-0" />
