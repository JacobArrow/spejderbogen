<script>
	import Like from '$components/Like.svelte';
	import Card from '$components/Card.svelte';
</script>

<Card hover={false}>
	<div class="card-body p-5 pb-2 h-full justify-between animate-pulse">
		<div class="card-title my-0 flex">
			<div class="badge mr-2 badge-primary border-base-300 bg-base-300 w-11" />
			<div class="badge w-full border-base-300 bg-base-300" />
		</div>
        <div class="mt-3">
			<div class="badge border-base-300 bg-base-300 w-full h-4 mt-1" />
			<div class="badge border-base-300 bg-base-300 w-1/2 h-4 mt-1" />
			<div class="badge border-base-300 bg-base-300 w-3/4 h-4 mt-1" />
        </div>
		<div class="card-actions flex items-center mt-2">
			<div class="badge border-base-300 bg-base-300 w-24 h-3" />
			<div class="badge border-base-300 bg-base-300 w-24 h-3" />
			<Like disabled={true} songId={0} />
		</div>
	</div>
</Card>
