<script>
	//Icons
	import HeartIcon from 'svelte-material-icons/HeartOutline.svelte';

	export let songId;

	function handleClick() {
		alert('you liked this');
	}
</script>

<button
	on:click|preventDefault={handleClick}
	class="btn btn-square btn-ghost stroke-current m-0 ml-auto"
>
	<HeartIcon size="24px" />
</button>
