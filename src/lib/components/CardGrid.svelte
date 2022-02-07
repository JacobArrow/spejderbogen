<script>
	export let xlCols = 3;
	export let lgCols = 2;
	export let mdCols = 2;
	export let xsCols = 1;
</script>

<div
	class="grid xl:grid-cols-{xlCols} lg:grid-cols-{lgCols} md:grid-cols-{mdCols} xs:grid-cols-{xsCols} gap-4"
>
	<slot />
</div>
