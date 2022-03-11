<script>
	//Functions
	import { encode } from '$functions/convertUrl';

	//Components
	import Card from './Card.svelte';
	import Like from './Like.svelte';

	export let song;
</script>

{#if song}
	<Card>
		<a href="/sange/{encode(song.name)}" class="no-underline font-normal h-full">
			<div class="card-body p-5 pb-2 h-full justify-between">
				<h2 class="card-title my-0 flex items-center">
					<div class="badge badge-primary float-left">{song.number}</div>
					<span class="line-clamp-1">{song.name}</span>
				</h2>
				<!-- TODO: add auto slow scroll -->
				<p class="card-body-text my-0 line-clamp-3">
					{song.text}
				</p>
				<div class="card-actions flex items-center">
					{#if Object.keys(song.categories).length}
						<a
							href="/kategorier/{encode(song.categories?.name)}"
							class="link link-hover no-underline font-normal"
							><div class="badge badge-ghost">{song.categories?.name}</div></a
						>
					{/if}
					{#if song.authors.length}
						<a
							href="/forfattere/{encode(song.authors[0]?.name)}"
							class="link link-hover no-underline font-normal"
							><div class="badge badge-ghost">{song.authors[0]?.name}</div></a
						>
					{/if}
					<Like songId={song.id} />
				</div>
			</div>
		</a>
	</Card>
{/if}

<style>
	.card-body-text {
		max-height: 88px;
	}
</style>