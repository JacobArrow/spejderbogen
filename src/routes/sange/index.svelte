<script lang="ts">
	import Pagination from '$components/Pagination.svelte';
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import { setParam, getParam } from '$functions/urlParams';
	import { afterUpdate, onMount } from 'svelte';
	import Card from '$components/SongCard.svelte';

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
	<CardGrid>
		<PaginatedList {data} let:data={indexedData} page={0}>
			<Card number={indexedData.number} name={indexedData.name} />
		</PaginatedList>
	</CardGrid>
{:catch error}
	<pre>{error}</pre>
{/await}
