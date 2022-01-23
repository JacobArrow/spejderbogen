<script lang="ts">
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
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

<svelte:head>
	<title>{import.meta.env.VITE_DEFAULT_TITLE} - Sange</title>
</svelte:head>

{#await getData()}
	<p>Fetching data...</p>
{:then data}
	<CardGrid>
		<PaginatedList {data} let:data={indexedData} page={0}>
			<Card {...indexedData} />
		</PaginatedList>
	</CardGrid>
{:catch error}
	<pre>{error}</pre>
{/await}
