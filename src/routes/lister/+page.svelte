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

	$: lists = liveQuery(async () => {
		return await db.lists.toArray();
	});

	async function deleteList(listId) {
		await db.lists.delete(listId);
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
				>
					<button
						class="btn btn-circle btn-xs btn-error h-7 w-7 absolute -top-2 -right-2"
						on:click|preventDefault={() => deleteList(list.id)}
					>
						<TrashIcon size="18px" />
					</button>
				</Card>
			</PaginatedList>
		</CardGrid>
		<p class="text-center">Find en sang for at oprette nye lister</p>
	</div>
{:else}
	<p class="text-center">Du har ingen lister<br />Find en sang for at oprette din første liste</p>
{/if}
