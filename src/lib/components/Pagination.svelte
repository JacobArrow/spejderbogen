<script>
	import { getPagination, getPaginationRange } from '$functions/pagination';
	import { afterUpdate, createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let min = 0;
	export let from = 0;
	export let to = 0;
	export let page = 0;
	export let offset = 1;
	export let range = [];
	export let show = 1;
	export let count = 0;
	$: pages = Math.ceil(count / show);
	$: setPagination(page);

	function setPagination(selectedPage) {
		const { from: f, to: t } = getPagination(selectedPage, show);
		from = f;
		to = t;
		range = getPaginationRange(selectedPage, { min: min, total: pages, length: 5 });
		dispatch('clicked', {page});
	}
</script>

{#if range.length > 1}
	<div class="btn-group flex-nowrap">
		<button class="btn px-2 xs:px-4" on:click={() => (page = Math.max(--page, min))}>
			Forrige
		</button>
		{#each range as number}
			<button
				class:btn-active={number === page}
				class="btn w-10 xs:w-12"
				on:click={() => (page = number)}
			>
				{number + offset}
			</button>
		{/each}
		<button class="btn px-2 xs:px-4" on:click={() => (page = Math.min(++page, pages - offset))}>
			Næste
		</button>
	</div>
{/if}
