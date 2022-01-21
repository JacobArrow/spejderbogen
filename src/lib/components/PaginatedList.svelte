<script>
	import Pagination from '$lib/components/Pagination.svelte';
	import { setParam, getParam } from '$lib/functions/urlParams';
	import { afterUpdate, onMount } from 'svelte';

	let from;
	let to;
	export let data;
	export let page;

	onMount(() => {
		const param = getParam('p');
		if (param) page = parseInt(param);
	});

	afterUpdate(() => {
		setParam({
			p: page
		});
	});
</script>

{#each { length: data.length } as _, i}
	<p>
		{#if i <= to && i >= from}
			<slot data={data[i]} />>
		{/if}
	</p>
{/each}
<div class="fixed bottom-4 sm:bottom-10 left-2/4 -translate-x-2/4">
	<Pagination count={data.length} bind:from bind:to bind:page defaultPage={page} />
</div>
