<script>
	import { getPagination, getPaginationRange } from '$functions/pagination';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let show = 1;
	export let count = 0;
	let pages = Math.round(count / show);
	export let from;
	export let to;
	export let page = 0;
	let range = [];
	$: setPagination(page);

	function setPagination(selectedPage) {
		const { from: f, to: t } = getPagination(selectedPage, show);
		console.log(f, t);
		from = f;
		to = t;
		range = getPaginationRange(page, { min: 0, total: pages, length: 5 });
		dispatch('clicked', {});
	}
</script>

<div class="btn-group flex-nowrap">
	<button class="btn px-2 xs:px-4" on:click={() => (page = Math.max(--page, 0))}> Forrige </button>
	{#each range as number}
		<button
			class:btn-active={number === page}
			class="btn w-10 xs:w-12"
			on:click={() => (page = number)}
		>
			{number + 1}
		</button>
	{/each}
	<button class="btn px-2 xs:px-4" on:click={() => (page = Math.min(++page, pages - 1))}>
		Næste
	</button>
</div>
