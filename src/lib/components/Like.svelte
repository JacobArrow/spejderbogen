<script>
	//Icons
	import HeartIcon from 'svelte-material-icons/HeartOutline.svelte';

	export let songId;
	export let disabled = false;

	function handleClick() {
		alert('you liked this');
	}
</script>

<button
	{disabled}
	on:click|preventDefault={handleClick}
	class="btn btn-square btn-ghost stroke-current m-0 ml-auto"
>
	<HeartIcon size="24px" />
</button>

<style lang="scss">
	.btn-disabled, .btn[disabled] {
		background-color: transparent;
	}
</style>
