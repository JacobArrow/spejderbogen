<script>
	import HeartIcon from 'svelte-material-icons/HeartOutline.svelte';

	function handleClick() {
		alert('you liked this');
	}
</script>

<div class="card cursor-pointer shadow-md">
	<a href="/test" class="no-underline font-normal">
		<div class="card-body p-5 pb-2">
			<h2 class="card-title my-0">
				<div class="badge mr-1 badge-primary">123</div>
				Sangtitel
			</h2>
			<!-- TODO: add auto slow scroll -->
			<p class="my-0 line-clamp-3">
				Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus
				veritatis sed molestiae voluptates incidunt iure sapiente. Rerum reiciendis beatae tenetur
				excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates
				incidunt iure sapiente.
			</p>
			<div class="card-actions flex items-center">
				<a href="/" class="link link-hover no-underline font-normal"
					><div class="badge badge-ghost">Kategori</div></a
				>
				<button
					on:click|preventDefault={handleClick}
					class="btn btn-square btn-ghost stroke-current m-0 ml-auto"
				>
					<HeartIcon size="24px" />
				</button>
			</div>
		</div>
	</a>
</div>

<style lang="scss">
	.card {
		&:hover {
			transition: all 0.2s ease-in-out;
			transform: scale(1.02);
		}
	}
</style>
