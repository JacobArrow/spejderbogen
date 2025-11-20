<script>
	//Components
	import Header from '$components/Header.svelte';

	//Data
	import { page } from '$app/stores';
	import { db } from '$data/db';
	import { DEFAULT_TITLE } from '$data/env';

	//Functions
	import { decode } from '$functions/convertUrl';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let status = 'loading'; // 'loading' | 'success' | 'error'
	let errorMessage = '';

	$: listName = decode($page.url.searchParams.get('name'));
	$: listSongIds = $page.url.searchParams.get('ids');

	onMount(async () => {
		if (!listName || !listSongIds) {
			status = 'error';
			errorMessage = 'Ugyldig delingslink - manglende information';
			return;
		}

		try {
			const songIds = listSongIds.split(',').map((id) => parseInt(id));

			// Validate song IDs
			if (songIds.some((id) => isNaN(id))) {
				status = 'error';
				errorMessage = "Ugyldig delingslink - ugyldige sang-ID'er";
				return;
			}

			// Check if a list with the same name and ids already exists
			const allLists = await db.lists.toArray();
			const existingList = allLists.find((list) => {
				if (list.name !== listName) return false;
				if (list.ids.length !== songIds.length) return false;
				// Check if all ids match (order-independent)
				return (
					list.ids.every((id) => songIds.includes(id)) &&
					songIds.every((id) => list.ids.includes(id))
				);
			});

			if (existingList) {
				// Redirect to existing list
				goto(`/lister/${existingList.id}`, { replaceState: true });
				return;
			}

			// Create new list
			const listId = await db.lists.add({
				name: listName,
				ids: songIds,
				fromShare: true
			});

			// Verify the list was written to database before navigating
			const verifyList = await db.lists.get(listId);
			if (!verifyList) {
				status = 'error';
				errorMessage = 'Listen kunne ikke gemmes';
				return;
			}

			status = 'success';
			// Navigate to the new list
			goto(`/lister/${listId}`, { replaceState: true });
		} catch (error) {
			console.error('Failed to import list:', error);
			status = 'error';
			errorMessage = 'Der opstod en fejl ved import af listen';
		}
	});
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Importerer liste</title>
</svelte:head>

<Header>Importerer liste</Header>

<div class="flex flex-col items-center justify-center min-h-[50vh] gap-4">
	{#if status === 'loading'}
		<div class="loading loading-spinner loading-lg" />
		<p class="text-center">Importerer listen "{listName}"...</p>
	{:else if status === 'error'}
		<div class="alert alert-error max-w-md">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{errorMessage}</span>
		</div>
		<a href="/lister" class="btn btn-primary">Tilbage til lister</a>
	{/if}
</div>
