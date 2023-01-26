<script>
	//Components
	import PaginatedList from '$components/PaginatedList.svelte';
	import CardGrid from '$components/CardGrid.svelte';
	import Card from '$components/CompactCard.svelte';
	import Header from '$components/Header.svelte';

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

	$: listName = $page.url.searchParams.get('name');
	$: listSongIds = $page.url.searchParams.get('ids');

	$: lists = liveQuery(async () => {
		return await db.lists.toArray();
	});

	onMount(async () => {
		if (listName && listSongIds) {
			await db.lists.add({
				name: listName,
				ids: listSongIds.split(',').map((id) => parseInt(id)),
				fromShare: true
			});
			history.replaceState(null, '', '/lister');
		}
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
						class="btn btn-circle btn-xs btn-error h-7 w-7 absolute -top-2 -right-2 animate-pulse"
						on:click|preventDefault={() => deleteList(list.id)}
					>
						<TrashIcon size="18px" />
					</button>
					{#if list.fromShare}
						<div class="absolute">
							<LinkIcon size="24px" />
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

<!-- https://www.florin-pop.com/blog/2019/03/css-pulse-effect/ -->
<style>
	.pulse-animate {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
		}

		70% {
			transform: scale(1);
			box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
		}

		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		}
	}
</style>
