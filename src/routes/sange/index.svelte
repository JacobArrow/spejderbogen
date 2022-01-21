<script lang="ts">
	import Pagination from '$lib/components/Pagination.svelte';
	import { setParam, getParam } from '$lib/functions/urlParams';
	import { afterUpdate, onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	let from;
	let to;
	let page;

	onMount(() => {
		const param = getParam('p');
		if (param) page = parseInt(param);
	});

	afterUpdate(() => {
		setParam({
			p: page
		});
	});

	async function getData() {
		const res = await self.fetch('/api/songs.json');

		if (res.ok) {
			const data = await res.json();
			return data;
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	}
</script>

{#await getData()}
	<p>Fetching data...</p>
{:then data}
	{#each { length: data.length } as _, i}
		<p>
			{#if i <= to && i >= from}
				{data[i].name}
			{/if}
		</p>
	{/each}
	<div class="fixed bottom-4 sm:bottom-10 left-2/4 -translate-x-2/4">
		<Pagination count={data.length} bind:from bind:to bind:page defaultPage={page} />
	</div>
{:catch error}
	<pre>{error}</pre>
{/await}
