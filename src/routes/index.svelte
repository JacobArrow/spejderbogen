<script>
	export let title = 'Forside';
</script>

<svelte:head>
	<title>Spejderbogen - {title}</title>
</svelte:head>

<button class="btn btn-primary">daisyUI Button</button>
<button class="button">test button</button>

<style lang="scss">
	.button {
		@apply w-full;
	}
</style>
