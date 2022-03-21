<script>
	//Icons
	import Close from 'svelte-material-icons/CloseCircleOutline.svelte';

	//Components
	import SearchResults from './SearchResults.svelte';

	//Functions
	import search from '$functions/search';

	let inputText = '';
	let input;
	let songs = [];
	let inputFocus = false;
	let resultHover = false;
	let inputHover = false;
	let loading = false;

	function clear() {
		inputText = '';
		input.focus();
	}

	async function doSearch(value) {
		loading = true;
		if (value.length)
			songs = await search(value).then((result) => {
				loading = false;
				return result;
			});
	}
</script>

<div class:focus={inputFocus} class="w-full max-w-lg relative search">
	<input
		type="text"
		placeholder="Søg sange..."
		class="input input-ghost outline-0 w-full"
		class:rounded-b-none={(inputText.length && inputFocus) || (resultHover && !loading)}
		bind:value={inputText}
		bind:this={input}
		on:input={() => doSearch(inputText)}
		on:focus={() => (inputFocus = true)}
		on:blur={() => (inputFocus = false)}
	/>
	{#if inputText.length}
		<div class="close absolute right-3 top-0 h-full flex items-center">
			<span class="cursor-pointer" on:click={clear}><Close width="24" height="24" /></span>
		</div>
	{/if}
</div>
{#if (inputText.length && inputFocus) || (resultHover && !loading)}
	<SearchResults {songs} bind:hover={resultHover} />
{/if}

<style lang="scss">
	:global(html[data-theme='light']) {
		& .search .close {
			@apply text-white;
		}
		& .search.focus .close {
			@apply text-neutral;
		}
	}
	:global(html[data-theme='dark']) {
		& .search input {
			@apply border-base-100;
		}
	}
</style>
