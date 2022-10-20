<script>
	//Components
	import Card from '$components/SongCard.svelte';
	import Header from '$components/Header.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Fab from '$lib/components/FAB.svelte';
	import ConditionalWrapper from '$lib/components/ConditionalWrapper.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	//Icons
	import PenIcon from 'svelte-material-icons/Pen.svelte';
	import SaveIcon from 'svelte-material-icons/ContentSaveOutline.svelte';
	import DeleteIcon from 'svelte-material-icons/Delete.svelte';
	import ShareIcon from 'svelte-material-icons/ShareVariant.svelte';

	//Functions
	import { page } from '$app/stores';
	import { decode } from '$functions/convertUrl';
	import autosize from 'svelte-autosize';
	import { goto } from '$app/navigation';
	
	//Misc
	import { scrollPosition } from '$lib/data/misc';

	$: isTablet = $scrollPosition.clientWidth < 768;
	$: iconSize = isTablet ? '25' : '30';

	const slug = decode($page.params.slug);
	let edit = false;
	let checkDelete = false;
	let listName;

	$: data = liveQuery(async () => {
		const list = await db.lists.where('id').equals(parseInt(slug)).first();
		const songs = await db.songs.bulkGet(list.ids);
		listName = list.name;
		return { songs, list };
	});

	async function renameList() {
		listName = listName.charAt(0).toUpperCase() + listName.slice(1);
		await db.lists.update($data.list.id, {
			name: listName.trim()
		});
		edit = false;
	}

	async function deleteList() {
		await db.lists.delete($data.list.id);
		goto('/lister');
	}

	async function removeSongFromList(id) {
		const ids = $data.list.ids.filter((songId) => songId !== id);
		console.log(ids);
		await db.lists.update($data.list.id, {
			ids
		});
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex nofollow" />
	<title>{DEFAULT_TITLE} - Liste</title>
</svelte:head>

{#if $data}
	<Header>
		<div class="swap" class:swap-active={edit}>
		<!-- TODO: Add smooth transition -->
		<!-- https://svelte.dev/repl/f4e83b7f544646cbae7f69728b615caa?version=3.31.0 -->
			<div class="w-fit m-auto relative swap-on">
				<textarea
					bind:value={listName}
					use:autosize
					rows="1"
					type="text"
					placeholder="Listenavn"
					class="textarea textarea-bordered outline-none text-center leading-none box-border w-full md:w-screen max-w-2xl"
				/>
				<button
					class="btn btn-circle btn-sm btn-primary p-2 w-fit h-fit align-bottom absolute -top-3 -right-3"
					on:click={renameList}
				>
					<SaveIcon size="26px" />
				</button>
			</div>
		
			<span class="max-w-2xl block leading-none m-auto py-3 swap-off">
				{listName}
				<button
					class="btn btn-circle btn-sm btn-primary align-bottom absolute m-2"
					on:click={() => (edit = !edit)}
				>
					<PenIcon size="20px" />
				</button></span
			>
		</div>
	</Header>
	{#if $data.songs.length}
		<div class="m-auto flex flex-col gap-4 mb-14 md:mb-6">
			{#each $data.songs as song, index}
				<div
					class="flex items-center justify-center gap-4 -ml-5 sm:-ml-10 lg:-ml-14 gap-x-0 sm:gap-x-2 relative"
				>
					<div
						class="m-0 text-5xl sm:text-7xl opacity-60 font-extralight number text-center sm:text-right"
					>
						{++index}.
					</div>
					<div class="w-full md:max-w-xl">
						<Card
							on:action={(event) => removeSongFromList(event.detail.id)}
							{song}
							action={edit}
							compact
						/>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-center">Listen er tom - Find en sang for at tilføje den</p>
	{/if}
	<Fab>
		<div class="flex flex-row md:flex-col justify-center md:gap-2 max-md:btn-group">
			<button class="btn btn-circle md:btn-outline md:btn-lg btn-primary max-md:w-16"><ShareIcon size="{iconSize}" /></button>
			<button
				class="btn btn-circle md:btn-lg md:btn-outline max-md:btn-primary btn-secondary swap swap-rotate max-md:w-16"
				class:swap-active={edit}
				on:click={() => (edit = !edit)}
			>
				<span class="swap-on">
					<SaveIcon size="{iconSize}" />
				</span>
				<span class="swap-off">
					<PenIcon size="{iconSize}" />
				</span>
			</button>
			<button
				class="btn btn-circle md:btn-lg max-md:btn-primary md:btn-outline btn-error max-md:w-16"
				on:click={() => (checkDelete = !checkDelete)}><DeleteIcon size="{iconSize}" /></button
			>
		</div>
	</Fab>
{:else}
	<p class="text-center">Hovsa, der findes ingen liste</p>
{/if}

<Modal
	bind:open={checkDelete}
	title="Vil du slette listen?"
	text="Denne handling kan ikke fortrydes"
	on:yes={deleteList}
	on:no={() => (checkDelete = !checkDelete)}
/>

<style lang="scss">
	.textarea {
		font-size: inherit;
		font-weight: inherit;
	}
	.number {
		min-width: 60px;
		@media (min-width: 640px) {
			min-width: 90px;
		}
	}
</style>
