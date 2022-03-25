<script>
	//Icons
	import PlaylistPlusIcon from 'svelte-material-icons/PlaylistPlus.svelte';
	import PlusIcon from 'svelte-material-icons/Plus.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	export let disabled = false;
	let newList = false;
    let listName = "";

	function handleClick() {}
    function createList(name) {
        listName = "";
        newList = false;
        console.log(name);
    }
</script>

<div class="dropdown dropdown-top dropdown-end">
	<button
		{disabled}
		on:click|preventDefault={handleClick}
		class="btn btn-square btn-ghost stroke-current m-0 ml-auto"
		aria-label="add to list"
	>
		<PlaylistPlusIcon size="24px" />
	</button>
	<div
		class="dropdown-content card card-compact w-64 p-4 shadow bg-neutral text-primary-content text-center flex gap-2"
	>
		<p class="m-0">Du har ingen lister</p>
		{#if newList}
			<div class="input-group">
				<input bind:value={listName} type="text" placeholder="Listenavn" class="input input-ghost input-sm w-full" />
				<button class="btn btn-sm bg-primary btn-square" on:click={() => createList(listName)}>
					<PlusIcon size="20px"/>
				</button>
			</div>
		{/if}
		<button class="btn btn-sm bg-primary w-fit m-auto" on:click={() => (newList = !newList)}
			>{newList ? 'Annuller' : 'Opret ny liste'}</button
		>
	</div>
</div>

<style lang="scss">
	.btn-disabled,
	.btn[disabled] {
		background-color: transparent;
	}
</style>
