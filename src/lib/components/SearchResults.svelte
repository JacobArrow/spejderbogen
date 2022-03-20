<script>
	import SongSearchResult from './SongSearchResult.svelte';

	export let hover = false;
	export let songs = [];

	function select() {
		hover = false;
	}
</script>

<ul
	on:mouseleave={() => (hover = false)}
	on:mouseenter={() => (hover = true)}
	class="search-results absolute menu compact shadow-lg bg-base-100 rounded-t-none rounded-box w-full max-w-lg mt-12 text-base-content z-50 overflow-hidden"
>
	<div class="overflow-auto overflow-x-hidden py-3">
		{#if songs.length}
			<li class="menu-title">
				<span class="px-4"> Resultater </span>
			</li>
			<li on:click={select}>
				{#each songs as song}
					<SongSearchResult {song} />
				{/each}
			</li>
		{:else}
			<li class="menu-title">
				<span class="px-4 self-center"> Æv, ingen resultater matcher din søgning :(</span>
			</li>
		{/if}
	</div>
</ul>

<style lang="scss">
	.search-results {
		max-height: 90vh;
		@media (min-width: 640px) {
			& > div {
				/* width */
				&::-webkit-scrollbar {
					width: 5px;
				}

				/* Track */
				&::-webkit-scrollbar-track {
					background-color: hsl(var(--b1) / var(--tw-bg-opacity)) !important;
				}

				/* Handle */
				&::-webkit-scrollbar-thumb {
					background: #02386893;
				}

				/* Handle on hover */
				&::-webkit-scrollbar-thumb:hover {
					background: #023968;
				}
			}
		}
		& .menu-title span {
			@apply py-0;
		}
	}
</style>
