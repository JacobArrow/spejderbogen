<script>
	//Components
	import Card from '$components/Card.svelte';
</script>

<Card>
	<div class="card-body p-5 h-full flex justify-center">
		<div class="my-0 flex items-center justify-between animate-pulse">
			<div
				class="badge justify-self-start badge-primary whitespace-nowrap badge-primary border-base-300 bg-base-300 w-40"
			/>
			<div
				class="badge justify-self-end badge-primary whitespace-nowrap badge-primary border-base-300 bg-base-300 w-20"
			/>
		</div>
	</div>
</Card>

<style>
	.card-body {
		min-height: 72px;
	}
</style>