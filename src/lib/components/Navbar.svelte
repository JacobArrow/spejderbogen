<script>
	import MenuIcon from 'svelte-material-icons/Menu.svelte';
	import DotsVetIcon from 'svelte-material-icons/DotsVertical.svelte';
	export let title = '';
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
	<div class="flex-none">
		<button class="btn btn-square btn-ghost stroke-current">
			<MenuIcon size="24px" />
		</button>
	</div>
	<div class="flex-1 px-2 mx-2">
		<span class="text-lg font-bold"><a href="/"> {title} </a></span>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-ghost">
			<DotsVetIcon size="24px" />
		</button>
	</div>
</div>
