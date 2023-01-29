<script>
	//Components
	import Card from '$components/SongCard.svelte';
	import Header from '$components/Header.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Fab from '$lib/components/FAB.svelte';

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
	import { decode, encode } from '$functions/convertUrl';
	import autosize from 'svelte-autosize';
	import { goto } from '$app/navigation';
	import { generateLocalGuid, getLocalGuid } from '$functions/guid';

	//Misc
	import { scrollPosition } from '$lib/data/misc';
	import Draggable from '$lib/components/Draggable.svelte';
	import { flip } from 'svelte/animate';

	$: isTablet = $scrollPosition.clientWidth < 768;
	$: iconSize = isTablet ? '25' : '30';
	$: shareableLink = `${$page.url.host}/lister?name=${$data ? encode($data.list.name) : ''}&ids=${
		$data ? $data.list.ids : ''
	}`;
	$: slug = decode($page.params.listSlug);

	let edit = false;
	let checkDelete = false;
	let showShareModal = false;
	let listName;
	let listSongs = [];
	let copied = false;

	$: data = liveQuery(async () => {
		const list = await db.lists.where('id').equals(parseInt(slug)).first();
		const songs = await db.songs.bulkGet(list.ids);
		listName = list.name;
		listSongs = songs;
		return { songs, list };
	});

	async function deleteList() {
		await db.lists.delete($data.list.id);
		goto('/lister');
	}

	async function updateList() {
		listName = listName.charAt(0).toUpperCase() + listName.slice(1);
		await db.lists.update($data.list.id, {
			ids: listSongs.map((song) => song.id),
			name: listName.trim()
		});
		edit = false;
	}

	async function removeSongFromList(songIndex) {
		listSongs.splice(songIndex, 1);
		await db.lists.update($data.list.id, {
			ids: listSongs.map((song) => song.id)
		});
	}

	function getSongIndex(song) {
		return listSongs.indexOf(song);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(shareableLink);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	async function shareList() {
		generateLocalGuid();
		showShareModal = !showShareModal;
		await db.lists.update($data.list.id, {
			guid: getLocalGuid()
		});
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex nofollow" />
	<title>{DEFAULT_TITLE} - Liste</title>
</svelte:head>

{#if $data}
	{#if $data.list.fromShare}
		<p class="text-sm text-center m-0">Denne liste er blevet delt med dig</p>
	{/if}
	<Header>
		<div class="swap" class:swap-active={edit}>
			<!-- TODO: Add smooth transition -->
			<!-- https://svelte.dev/repl/f4e83b7f544646cbae7f69728b615caa?version=3.31.0 -->
			<div class="w-fit m-auto relative swap-on">
				<textarea
					bind:value={listName}
					on:keydown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
							updateList();
						}
					}}
					use:autosize
					rows="1"
					type="text"
					placeholder="Listenavn"
					class="textarea textarea-bordered outline-none text-center leading-none box-border w-full md:w-screen max-w-2xl"
				/>
				<button
					disabled={!edit}
					class="btn btn-circle btn-sm btn-primary p-2 w-fit h-fit align-bottom absolute -top-3 -right-3"
					on:click={updateList}
				>
					<SaveIcon size="26px" />
				</button>
			</div>

			<span class="max-w-2xl block leading-none m-auto py-3 swap-off">
				{listName}
				<button
					disabled={edit}
					class="btn btn-circle btn-sm btn-primary align-bottom absolute m-2"
					on:click={() => (edit = !edit)}
				>
					<PenIcon size="20px" />
				</button></span
			>
		</div>
	</Header>
	{#if listSongs.length}
		<Draggable
			bind:items={listSongs}
			let:prop={song}
			disabled={!edit}
			wrapperClass="m-auto flex flex-col gap-4 mb-14 md:mb-6 -ml-5 sm:-ml-10 lg:-ml-14"
			itemClass="flex items-center justify-center gap-4 gap-x-0 sm:gap-x-2 relative"
		>
			<div
				class="m-0 text-5xl sm:text-7xl opacity-60 font-extralight number text-center sm:text-right"
			>
				{getSongIndex(song) + 1}
			</div>
			<div class="w-full md:max-w-xl item">
				<Card
					on:action={(event) => removeSongFromList(getSongIndex(song))}
					action={edit}
					disabled={edit}
					urlParmas="?list={slug}"
					{song}
					compact
				/>
			</div>
		</Draggable>
	{:else}
		<p class="text-center">Listen er tom - Find en sang for at tilføje den</p>
	{/if}
	<Fab>
		<div class="flex flex-row md:flex-col justify-center md:gap-2 max-md:btn-group">
			<button
				on:click={shareList}
				class="btn btn-circle md:btn-outline md:btn-lg btn-primary max-md:w-16"
			>
				<ShareIcon size={iconSize} />
			</button>
			<button
				class="btn btn-circle md:btn-lg md:btn-outline max-md:btn-primary btn-secondary swap swap-rotate max-md:w-16"
				class:swap-active={edit}
				on:click={() => (edit ? updateList() : (edit = !edit))}
			>
				<span class="swap-on">
					<SaveIcon size={iconSize} />
				</span>
				<span class="swap-off">
					<PenIcon size={iconSize} />
				</span>
			</button>
			<button
				class="btn btn-circle md:btn-lg max-md:btn-primary md:btn-outline btn-error max-md:w-16"
				on:click={() => (checkDelete = !checkDelete)}><DeleteIcon size={iconSize} /></button
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

<Modal
	title="Del listen via nedenstående link"
	accept="Luk"
	deny=""
	bind:open={showShareModal}
	on:yes={() => (showShareModal = !showShareModal)}
>
	<div class="relative">
		<pre class="flex">
			<code class="whitespace-nowrap leading-none pb-2 pt-10">
				{shareableLink}
			</code>
		</pre>
		<button
			on:click={copyToClipboard}
			class="swap btn btn-ghost btn-sm btn-outline font-sans text-neutral-content hover:text-base-200 absolute right-2 top-2 outline-offset-1"
			class:swap-active={copied}
			class:outline={copied}
		>
			<span class="swap-off">Kopier</span>
			<span class="swap-on">Kopieret!</span>
		</button>
	</div>
</Modal>

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
