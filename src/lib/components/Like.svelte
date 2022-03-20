<script>
	//Icons
	import HeartOutlineIcon from 'svelte-material-icons/HeartOutline.svelte';
	import HeartIcon from 'svelte-material-icons/Heart.svelte';

	//Data
	import { liveQuery } from 'dexie';
	import { db } from '$data/db';

	export let songId;
	$: song = {id:songId};
	export let disabled = false;

	$: liked = liveQuery(async () => {
		const like = await db.likes.where('id').equals(songId).first();
		return like;
	});

	async function like() {
		await db.likes.put(song);
	}

	async function unLike() {
		await db.likes.delete(songId);
	}

	function handleClick() {
		$liked? unLike() : like();
	}
</script>

<button
	{disabled}
	on:click|preventDefault={handleClick}
	class="btn btn-square btn-ghost stroke-current m-0 ml-auto"
	class:$liked
>
<div class="swap" class:text-error={$liked} class:swap-active={$liked}>
	<div class="swap-on"><HeartIcon size="24px" /></div>
	<div class="swap-iff"><HeartOutlineIcon size="24px" /></div>
</div>
</button>

<style lang="scss">
	.btn-disabled,
	.btn[disabled] {
		background-color: transparent;
	}
</style>
