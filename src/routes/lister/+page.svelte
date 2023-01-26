<script>
	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/CompactCard.svelte';
	import Header from '$components/Header.svelte';
	import Modal from '$components/Modal.svelte';

	//Icons
	import TrashIcon from 'svelte-material-icons/Delete.svelte';
	import LinkIcon from 'svelte-material-icons/LinkVariant.svelte';

	//Data
	import { page } from '$app/stores';
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	//Misc
	import { onMount } from 'svelte';

	//functions
	import { decode } from '$functions/convertUrl';
	import { goto } from '$app/navigation';

	let newListAdded = false;
	let listToDelete = 0;
	let checkDelete = false;

	$: listName = decode($page.url.searchParams.get('name'));
	$: listSongIds = $page.url.searchParams.get('ids');

	$: lists = liveQuery(async () => {
		return await db.lists.toArray();
	});

	onMount(async () => {
		if (listName && listSongIds) {
			await db.lists
				.add({
					name: listName,
					ids: listSongIds.split(',').map((id) => parseInt(id)),
					fromShare: true
				})
				.then((listId) => {
					goto(`/lister/${listId}`, { replaceState: true });
				});
			newListAdded = true;
		}
	});

	async function deleteList() {
		await db.lists.delete(listToDelete);
		newListAdded = false;
		checkDelete = !checkDelete;
	}
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Favoritter</title>
</svelte:head>

<Header>Dine lister</Header>
{#if $lists?.length}
	<div class="max-w-4xl mx-auto">
		<CardGrid xlCols={2}>
			<PaginatedList data={$lists} let:data={list} page={0} show={16}>
				<Card
					subPath={'lister'}
					path={`${list.id}`}
					content={list.name}
					badgeContent={`${list.ids.length} sange`}
					classes={newListAdded && $lists.slice(-1).pop() === list
						? 'animate-pulse short-animation'
						: ''}
				>
					<button
						class="btn btn-circle btn-xs btn-error h-7 w-7 absolute -top-2 -right-2 z-10"
						on:click|preventDefault={() => {
							listToDelete = list.id;
							checkDelete = !checkDelete;
						}}
					>
						<TrashIcon size="18px" />
					</button>
					{#if list.fromShare}
						<div class="card absolute top-0 left-0 w-full h-full overflow-hidden">
							<div class="absolute -left-5 -top-6 opacity-30 text-primary stroke-primary">
								<LinkIcon size="120px" />
							</div>
						</div>
					{/if}
				</Card>
			</PaginatedList>
		</CardGrid>
		<p class="text-center">Find en sang for at oprette nye lister</p>
	</div>
{:else}
	<p class="text-center">Du har ingen lister<br />Find en sang for at oprette din første liste</p>
{/if}

<Modal
	bind:open={checkDelete}
	title="Vil du slette listen?"
	text="Denne handling kan ikke fortrydes"
	on:yes={deleteList}
	on:no={() => (checkDelete = !checkDelete)}
/>
