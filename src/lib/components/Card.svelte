<script>
	export let hover = true;
</script>

<div class:hover class="card shadow-md overflow-visible w-full bg-primary-content">
	<slot />
</div>

<style lang="scss">
	.card {
		border: 0.1px solid rgb(0 0 0 / 0.1);
		transition: all 0.2s ease-in-out;
		&.hover:hover {
			transform: scale(1.02);
			cursor: pointer;
		}
	}
</style>
