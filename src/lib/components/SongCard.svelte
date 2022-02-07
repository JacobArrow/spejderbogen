<script>
	import HeartIcon from 'svelte-material-icons/HeartOutline.svelte';
	import { encode } from '$functions/convertUrl';
	export let id = 0;
	export let number = 0;
	export let name = '';
	export let text = '';
	export let categories = {};
	export let authors = [];
	export let melody = '';

	function handleClick() {
		alert('you liked this');
	}
</script>

<div class="card cursor-pointer shadow-md">
	<a href="/sange/{encode(name)}" class="no-underline font-normal h-full">
		<div class="card-body p-5 pb-2 h-full justify-between">
			<h2 class="card-title my-0 line-clamp-1">
				<div class="badge mr-1 badge-primary">{number}</div>
				{name}
			</h2>
			<!-- TODO: add auto slow scroll -->
			<p class="my-0 line-clamp-3 h-">
				{text}
			</p>
			<div class="card-actions flex items-center">
				{#if Object.keys(categories).length}
					<a
						href="/kategorier/{encode(categories?.name)}"
						class="link link-hover no-underline font-normal"
						><div class="badge badge-ghost">{categories?.name}</div></a
					>
				{/if}
				{#if authors.length}
					<a
						href="/forfattere/{encode(authors[0]?.name)}"
						class="link link-hover no-underline font-normal"
						><div class="badge badge-ghost">{authors[0]?.name}</div></a
					>
				{/if}
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
		border: 0.1px solid rgb(0 0 0 / 0.1);
		&:hover {
			transition: all 0.2s ease-in-out;
			transform: scale(1.02);
		}
	}
</style>
