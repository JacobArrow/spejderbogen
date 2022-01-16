<script>
	export let value = '';
	export let hover = false;
	let titel = 'Sangtitel';
	const select = (val) => () => (value = val);
</script>

<ul
	on:mouseleave={() => (hover = false)}
	on:mouseenter={() => (hover = true)}
	class="search-result absolute menu compact py-3 shadow-lg bg-base-100 rounded-t-none rounded-box w-full max-w-lg mt-12 text-base-content z-50"
>
	<li class="menu-title">
		<span> Resultater </span>
	</li>
	<li>
		<a
			on:click={select(titel)}
			class="flex-wrap active:bg-base-300 active:text-base-content"
			href="/sange/1"
		>
			<div class="badge mr-2 success">123</div>
			<div class="font-bold truncate text-base">{titel}</div>
			<div class="flex-none w-full line-clamp-2 text-sm">
				Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius dignissim
				accumsan. Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius
				dignissim accumsan.
			</div>
		</a>
	</li>
	<li>
		<a
			on:click={select(titel)}
			class="flex-wrap active:bg-base-300 active:text-base-content"
			href="/"
		>
			<div class="badge mr-2 success">123</div>
			<div class="font-bold truncate text-base">{titel}</div>
			<div class="flex-none w-full line-clamp-2 text-sm">
				Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius dignissim
				accumsan. Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius
				dignissim accumsan.
			</div>
		</a>
	</li>
	<li>
		<a
			on:click={select(titel)}
			class="flex-wrap active:bg-base-300 active:text-base-content"
			href="/"
		>
			<div class="badge mr-2 success">123</div>
			<div class="font-bold truncate text-base">{titel}</div>
			<div class="flex-none w-full line-clamp-2 text-sm">
				Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius dignissim
				accumsan. Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius
				dignissim accumsan.
			</div>
		</a>
	</li>
</ul>

<style lang="scss">
	.search-result .menu-title span {
		@apply py-0;
	}
</style>
