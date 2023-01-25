<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let open = false;
	export let title = 'Advarsel';
	export let text = '';
	export let accept = 'Ja';
	export let deny = 'Nej';

	const dispatch = createEventDispatcher();

	const yes = () => dispatch('yes');
	const no = () => dispatch('no');
</script>

{#if open}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		transition:fade={{ duration: 150 }}
		on:click|self={() => (open = false)}
		class:modal-open={open}
		class="modal"
	>
		<div class="modal-box">
			<h3 class="font-bold text-lg mt-0">{title}</h3>
			<p class="p-0">{text}</p>
			<slot />
			<div class="modal-action">
				{#if accept.length}
					<button on:click={yes} class="btn btn-primary">{accept}</button>
				{/if}
				{#if deny.length}
					<button on:click={no} class="btn btn-primary btn-outline">{deny}</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
