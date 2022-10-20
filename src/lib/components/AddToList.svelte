<script>
	//Components
	import Modal from './Modal.svelte';

	//Icons
	import PlaylistPlusIcon from 'svelte-material-icons/PlaylistPlus.svelte';
	import PlusIcon from 'svelte-material-icons/Plus.svelte';
	import CloseIcon from 'svelte-material-icons/Close.svelte';
	import PenIcon from 'svelte-material-icons/Pen.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';

	//Mics
	import { fade } from 'svelte/transition';
	import { clickOutside } from 'svelte-use-click-outside';

	export let disabled = false;
	export let songId;
	let newList = false;
	let listName = '';
	let showMenu = false;
	let duplicate = false;
	let selectedList;

	$: lists = liveQuery(async () => {
		return await db.lists.toArray();
	});

	async function createList(name) {
		name.length
			? name.charAt(0).toUpperCase() + name.slice(1)
			: (name = `Liste ${$lists.length + 1}`);
		await db.lists.add({ name: name, ids: [] });
		listName = '';
		newList = false;
	}

	function checkForDuplicate(list, songId) {
		if (list.ids.includes(songId)) {
			selectedList = list;
			duplicate = true;
		} else {
			addSongToList(list, songId);
		}
	}

	async function addSongToList(list, songId) {
		duplicate = false;
		list.ids.push(songId);
		await db.lists.put({ id: list.id, name: list.name, ids: list.ids });
		showMenu = false;
		selectedList = null;
	}
</script>

<div class="dropdown">
	<button
		{disabled}
		on:click={() => (showMenu = !showMenu)}
		class="btn btn-square btn-ghost stroke-current m-0 ml-auto"
		aria-label="add to list"
	>
		<PlaylistPlusIcon size="24px" />
	</button>
	{#if showMenu}
		<div
			transition:fade={{ duration: 150 }}
			use:clickOutside={() => (showMenu = false)}
			class="card card-compact w-64 py-4 shadow bg-neutral text-primary-content text-center flex gap-2 bottom-full top-auto right-0 absolute"
		>
			<button
				on:click={() => (showMenu = false)}
				class="btn btn-square btn-sm btn-link text-current stroke-current m-0 absolute top-1 right-1"
				aria-label="close"
			>
				<CloseIcon size="20px" />
			</button>
			{#if $lists.length}
				<p class="m-0">{newList ? 'Opret ny liste' : 'Tilføj sangen til en liste'}</p>
				<ul class="p-0 m-2 ml-8 not-prose list-none">
					{#each $lists as list}
						<li class="p-0 flex items-center gap-1">
							<button
								on:click={() => checkForDuplicate(list, songId)}
								class="btn btn-ghost btn-sm text-current h-fit flex-shrink grow basis-auto"
								>{list.name}<span class="ml-1">({list.ids.length})</span>
							</button>
                            <a href="/lister/{list.id}"
                            class="p-1 btn btn-ghost btn-square btn-sm text-current w-fit h-fit">
                                <PenIcon size="20px" />
                            </a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="m-0">{newList ? 'Opret ny liste' : 'Du har ingen lister'}</p>
			{/if}
			{#if newList}
				<div class="input-group">
					<input
						bind:value={listName}
						on:keypress={(event) => (event.key == 'Enter' ? createList(listName) : '')}
						type="text"
						placeholder="Listenavn"
						class="input input-ghost input-sm outline-0 w-full"
					/>
					<button
						class="btn btn-sm bg-primary btn-square"
						aria-label="create"
						on:click={() => createList(listName)}
					>
						<PlusIcon size="20px" />
					</button>
				</div>
			{/if}
			<button class="btn btn-sm bg-primary w-fit m-auto" on:click={() => (newList = !newList)}>
				{newList ? 'Annuller' : 'Opret ny liste'}
			</button>
		</div>
	{/if}
</div>

<Modal
	bind:open={duplicate}
	title="Sangen er tilføjet i forvejen"
	text="Er du sikker på at du stadig vil tilføje den?"
	on:yes={() => addSongToList(selectedList, songId)}
	on:no={() => (duplicate = false)}
/>

<style lang="scss">
	.btn-disabled,
	.btn[disabled] {
		background-color: transparent;
	}
</style>