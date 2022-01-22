<script lang="ts">
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/SongCard.svelte';
	import { encode, decode } from '$functions/convertUrl';
	let encodeStr = '';
	let decodeStr = '';

	encodeStr = encode('ååh abe');
	decodeStr = decode(encodeStr);
	console.log(encodeStr, decodeStr);

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
			<Card {...indexedData} />
		</PaginatedList>
	</CardGrid>
{:catch error}
	<pre>{error}</pre>
{/await}
