<script>
	//Icons
	import CloseIcon from 'svelte-material-icons/Close.svelte';

	//Misc
	import { drawer } from '$data/misc';
	import { DRAWER_LINKS } from '$data/links';
	export let title = '';
</script>

<div class="drawer h-screen">
	<input
		id="main-drawer"
		type="checkbox"
		class="drawer-toggle"
		bind:checked={$drawer}
		on:change={drawer.toggle}
	/>
	<div class="drawer-content overflow-y-scroll" id="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="main-drawer" class="drawer-overlay" />
		<div class="menu overflow-y-auto w-72 bg-base-100">
			<div class="navbar shadow-lg bg-neutral text-neutral-content flex w-full justify-center">
				<div class="navbar-start">
					<button class="btn btn-square btn-ghost stroke-current" on:click={drawer.toggle}
						><CloseIcon size="24px" /></button
					>
				</div>
				<div class="navbar-center">
					<a href="/" class="btn btn-ghost text-xl font-bold uppercase"> {title} </a>
				</div>
				<div class="navbar-end" />
			</div>
			<ul class="p-4 text-base-content">
				{#each DRAWER_LINKS as link}
					<li>
						<a href={link.link} class="btn btn-ghost justify-start text-base"
							><span class="mr-2"><svelte:component this={link.icon} size="24px" /></span>
							{link.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
