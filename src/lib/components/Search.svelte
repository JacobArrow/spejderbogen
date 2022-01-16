<script>
	import SearchResult from './SearchResult.svelte';

	let inputText = '';
	let inputFocus = false;
	let resultHover = false;
</script>

<input
	type="text"
	placeholder="Søg sange..."
	class="input input-ghost w-full max-w-lg"
	class:rounded-b-none={inputText.length}
	bind:value={inputText}
	on:focus={() => (inputFocus = true)}
	on:blur={() => (inputFocus = false)}
/>
{#if (inputText.length && inputFocus) || resultHover}
	<SearchResult bind:value={inputText} bind:hover={resultHover} />
{/if}
