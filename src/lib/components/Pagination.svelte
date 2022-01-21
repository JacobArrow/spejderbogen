<script>
	import { getPagination, getPaginationRange } from '$lib/functions/pagination';
	export let show = 10;
	export let count = 0;
	let pages = Math.round(count / show);
	export let from = 0;
	export let to = 10;
	export let defaultPage = 0;
	export let page = 0;
	let range = [];

	function setPagination(selectedPage) {
		const { from: f, to: t } = getPagination(selectedPage, 10);
		from = f;
		to = t;
		page = selectedPage;
		range = getPaginationRange(page, { total: pages });
	}

	setPagination(defaultPage);
</script>

<div class="btn-group flex-nowrap">
	<button class="btn px-2 xs:px-4" on:click={() => setPagination(Math.max(--page, 0))}>
		Forrige
	</button>
	{#each range as number}
		<button
			class:btn-active={number === page}
			class="btn w-10 xs:w-12"
			on:click={() => setPagination(number)}
		>
			{number + 1}
		</button>
	{/each}
	<button class="btn px-2 xs:px-4" on:click={() => setPagination(Math.min(++page, pages - 1))}>
		Næste
	</button>
</div>
