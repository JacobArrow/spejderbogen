<script>
	//Components
	import Card from './Card.svelte';

	//Functions
	import { encode } from '$functions/convertUrl';

	export let subPath = '';
	export let path = '';
	export let content = '';
	export let badgeContent = '';
</script>

<Card>
	<a href="/{subPath}/{encode(path)}" class="no-underline h-full">
		<div class="card-body p-5 h-full">
			<h2 class=" my-0 flex items-center justify-between">
				<span class="overflow-hidden text-ellipsis whitespace-nowrap">{content}</span>
				{#if badgeContent}
					<div class="badge justify-self-end badge-primary whitespace-nowrap">{badgeContent}</div>
				{/if}
			</h2>
			<slot />
		</div>
	</a>
</Card>
