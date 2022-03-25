<script>
	//Components
	import Card from './Card.svelte';
	import Like from './Like.svelte';

	//Functions
	import { encode } from '$functions/convertUrl';
	import AddToList from './AddToList.svelte';

	export let song;
</script>

{#if song}
	<Card hover={false}>
		<div class="card-body p-5 pb-2 h-full justify-between">
			<div class="mx-auto">
				<h2 class="card-title mb-2 my-0 flex items-center">
					<div class="badge badge-primary float-left">{song.number}</div>
					<span class="line-clamp-1">{song.name}</span>
				</h2>
				<p class="my-0 whitespace-pre-wrap md:prose-lg">
					{song.text}
				</p>
			</div>
			<div class="card-actions mt-4 flex items-center">
				{#if Object.keys(song.categories).length}
					<a
						href="/kategorier/{encode(song.categories.name)}"
						class="link link-hover no-underline font-normal"
						><div class="badge badge-ghost">{song.categories?.name}</div></a
					>
				{/if}
				{#each song.authors as author}
					<a
						href="/forfattere/{encode(author.name)}"
						class="link link-hover no-underline font-normal"
						><div class="badge badge-ghost">{author.name}</div></a
					>
				{/each}
				<div class="flex ml-auto">
					<AddToList />
					<Like songId={song.id} />
				</div>
			</div>
		</div>
	</Card>
{/if}
