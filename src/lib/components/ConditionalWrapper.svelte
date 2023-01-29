<script>
	export let component = null;
	export let wrap = false;
</script>

{#if wrap && component}
	<svelte:component this={component} {...$$restProps}>
		<slot />
	</svelte:component>
{:else}
	<slot />
{/if}