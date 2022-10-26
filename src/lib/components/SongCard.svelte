<script>
	//Functions
	import { encode } from '$functions/convertUrl';
	import { createEventDispatcher } from 'svelte';

	//Components
	import Card from './Card.svelte';
	import Like from './Like.svelte';

	//Icons
	import DeleteIcon from 'svelte-material-icons/Delete.svelte';

	//Misc
	import { quintIn } from 'svelte/easing';
	import { scale } from "svelte/transition";

	export let song;
	export let compact = false;
	export let action = false;
	export let actionIcon = null;
	export let actionClass = "";

	const dispatch = createEventDispatcher();
</script>

{#if song}
	<Card>
		<a href="/sange/{encode(song.name)}" class="no-underline font-normal h-full">
			<div class:compact={compact} class="card-body p-5 pb-2 h-full justify-between">
				<h2 class="card-title my-0 flex items-center">
					<div class="badge badge-primary float-left">{song.number}</div>
					<span class="line-clamp-1">{song.name}</span>
				</h2>
				<!-- TODO: add auto slow scroll -->
				{#if !compact}
					<p class="card-body-text my-0 line-clamp-3">
						{song.text}
					</p>
				{/if}
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
		{#if action}
			<button
				on:click={() => dispatch('action', song)}
				transition:scale={{ duration: 200, easing: quintIn }}
				class="btn btn-circle btn-sm btn-error p-1 w-fit h-fit align-bottom absolute -top-3 -right-3 {actionClass}"
			>
				<svelte:component this={actionIcon || DeleteIcon} size="24px" />
			</button>
		{/if}
	</Card>
{/if}

<style lang="scss">
	.card-body-text {
		max-height: 88px;
	}

	.card-body.compact {
		padding: 0.8rem !important;
		padding-bottom: 0 !important;
		gap: 0;
		@media (min-width: 640px) {
			padding: 1.25rem !important;
			padding-bottom: 0.5rem !important;
		}
	}
</style>
