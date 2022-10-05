<script lang="ts">
	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/SongCard.svelte';
	import Header from '$components/Header.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';
	import SongCard from '$components/Skeleton/SongCard.svelte';

	//Icons
	import PenIcon from 'svelte-material-icons/Pen.svelte';
	import SaveIcon from 'svelte-material-icons/ContentSaveOutline.svelte';

	//Functions
	import { page } from '$app/stores';
	import { decode } from '$functions/convertUrl';

	const slug = decode($page.params.slug);
	let edit = true;
	let listName;

	$: data = liveQuery(async () => {
		const list = await db.lists.where('id').equals(parseInt(slug)).first();
		const songs = await db.songs.where('id').anyOf(list.ids).toArray();
		listName = list.name;
		return { songs, list };
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Liste</title>
</svelte:head>

{#if $data}
	<Header>
		{#if edit}
			<div class="input-group overflow-hidden justify-center">
				<input
					bind:value={listName}
					type="text"
					placeholder="Listenavn"
					class="input input-bordered outline-none text-center"
				/>
				<button
					class="btn bg-primary btn-square"
					aria-label="create"
				>
					<SaveIcon size="26px" />
				</button>
			</div>
		{:else}
			<span>{$data.list.name}</span>
			<button
				class="btn btn-circle btn-sm btn-primary text-primary-content align-bottom"
				on:click={() => (edit = !edit)}
			>
				<PenIcon size="20px" />
			</button>
		{/if}
	</Header>
	<Header>Test</Header>
	{#if $data.songs}
		<CardGrid>
			<PaginatedList data={$data.songs} let:data={indexedData} page={0}>
				<Card song={indexedData} />
			</PaginatedList>
		</CardGrid>
	{:else}
		<p class="text-center">Listen er tom</p>
	{/if}
{/if}

<style lang="scss">
	.input {
		font-size: inherit;
		font-weight: inherit;
	}
</style>