<script>
	import HeartIcon from 'svelte-material-icons/HeartOutline.svelte';
</script>

<div class="card shadow-2xl w-72 cursor-pointer">
	<a href="/test" class="no-underline font-normal">
		<div class="card-body p-5 pb-2">
			<h2 class="card-title my-0">
				<div class="badge mr-1 badge-primary">123</div>
				Sangtitel
			</h2>
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
				<button class="btn btn-square btn-ghost stroke-current m-0 ml-auto">
					<HeartIcon size="24px" />
				</button>
			</div>
		</div>
	</a>
</div>
<div class="card shadow-2xl w-72 cursor-pointer font-normal">
	<div class="card-body p-5 pb-2">
		<h2 class="card-title my-0">
			<div class="badge mr-1 badge-primary">123</div>
			Sangtitel
		</h2>
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
			<button class="btn btn-square btn-ghost stroke-current m-0 ml-auto">
				<HeartIcon size="24px" />
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	.card-actions:last-child {
		@apply mt-0;
	}
	.card {
		&:hover {
			transition: all 0.2s ease-in-out;
			transform-origin: 51% 51%;
		}
	}
</style>
