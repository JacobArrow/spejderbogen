<script>
	//Components
	import SearchResults from './SearchResults.svelte';

	//Functions
	import search from "$functions/search"

	let inputText = '';
	let songs = [];
	let inputFocus = false;
	let resultHover = false;
	let loading = false;

	async function doSearch(value) {
		loading = true;
		if(value.length)
		songs = await search(value).then(result => {
			loading = false
			return result;
		});	
		}
</script>

<input
	type="text"
	placeholder="Søg sange..."
	class="input input-ghost w-full max-w-lg"
	class:rounded-b-none={(inputText.length && inputFocus) || resultHover && !loading}
	bind:value={inputText}
	on:input={() => doSearch(inputText)}
	on:focus={() => (inputFocus = true)}
	on:blur={() => (inputFocus = false)}
/>
{#if (inputText.length && inputFocus) || resultHover && !loading}
	<SearchResults {songs} bind:hover={resultHover} />
{/if}
