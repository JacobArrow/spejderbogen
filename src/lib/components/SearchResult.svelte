<script>
	export let value = '';
	export let hover = false;
	let titel = 'Sangtitel';
	function select(val) {
		value = val;
		hover = false;
	}
</script>

<ul
	on:mouseleave={() => (hover = false)}
	on:mouseenter={() => (hover = true)}
	class="search-result absolute menu compact py-3 shadow-lg bg-base-100 rounded-t-none rounded-box w-full max-w-lg mt-12 text-base-content z-50"
>
	<li class="menu-title">
		<span class="px-4"> Resultater </span>
	</li>
	<li>
		<a
			on:click={() => select(titel)}
			class="flex-wrap active:bg-base-300 active:text-base-content px-4"
			href="/sange/1"
		>
			<div class="flex items-center min-w-0">
				<div class="badge mr-2 success">123</div>
				<div class="font-bold truncate text-base">Tak, Gud for hver en nyfødt morgen</div>
			</div>
			<div class="flex-none w-full line-clamp-2 text-sm">
				Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius dignissim
				accumsan. Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius
				dignissim accumsan.
			</div>
		</a>
	</li>
	<li>
		<a
			on:click={() => select(titel)}
			class="flex-wrap active:bg-base-300 active:text-base-content px-4"
			href="/"
		>
			<div class="flex items-center min-w-0">
				<div class="badge mr-2 success">123</div>
				<div class="font-bold truncate text-base">{titel} {titel} {titel}</div>
			</div>
			<div class="flex-none w-full line-clamp-2 text-sm">
				Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius dignissim
				accumsan. Nullam eget malesuada est, eget sollicitudin est. Fusce pretium ante varius
				dignissim accumsan.
			</div>
		</a>
	</li>
	<li>
		<a
			on:click={() => select(titel)}
			class="flex-wrap active:bg-base-300 active:text-base-content px-4"
			href="/"
		>
			<div class="flex items-center min-w-0">
				<div class="badge mr-2 success">123</div>
				<div class="font-bold truncate text-base">{titel} {titel} {titel}</div>
			</div>
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
