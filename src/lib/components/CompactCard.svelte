<script>
	import { encode } from '$functions/convertUrl';

	export let subPath = '';
	export let path = '';
	export let content = '';
	export let badgeContent = '';
</script>

<div class="card cursor-pointer shadow-md">
	<a href="/{subPath}/{encode(path)}" class="no-underline h-full">
		<div class="card-body p-5 h-full">
			<h2 class=" my-0 flex items-center justify-between">
				{content}
				{#if badgeContent}
					<div class="badge justify-self-end badge-primary">{badgeContent}</div>
				{/if}
			</h2>
		</div>
	</a>
</div>

<style lang="scss">
	.card {
		border: 0.1px solid rgb(0 0 0 / 0.1);
		&:hover {
			transition: all 0.2s ease-in-out;
			transform: scale(1.02);
		}
	}
</style>
