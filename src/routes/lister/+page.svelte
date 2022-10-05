<script>
	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/CompactCard.svelte';
	import Header from '$components/Header.svelte';

	//Icons
	import TrashIcon from 'svelte-material-icons/Delete.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	//Misc
	import { v4 as uuidv4 } from 'uuid';
	import { list } from 'postcss';

	let guid;
	let showModal = false;
	const listKeyItem = 'listKey';

	$: lists = liveQuery(async () => {
		return await db.lists.toArray();
	});

	async function deleteList(listId) {
		await db.lists.delete(listId);
	}

	function createList() {
		//db.lists.add({ id: uuidv4() });
	}

	function shareList() {
		let listKey = localStorage.getItem(listKeyItem) || localStorage.setItem(listKeyItem, uuidv4());
	}
</script>

<button on:click={createList} class="btn">Opret GUID</button>

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
				>
					<button
						class="btn btn-circle btn-xs btn-error text-primary-content h-7 w-7 absolute -top-2 -right-2"
						on:click|preventDefault={() => deleteList(list.id)}
					>
						<TrashIcon size="18px" />
					</button>
				</Card>
			</PaginatedList>
		</CardGrid>
	</div>
{:else}
	<p class="text-center">Du har ingen lister<br />Find en sang for at oprette din første liste</p>
{/if}