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
	import { db, liveQuery } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	let listToDelete = 0;
	let checkDelete = false;

	$: lists = liveQuery(async () => {
		return await db.lists.toArray();
	});

	async function deleteList() {
		await db.lists.delete(listToDelete);
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
