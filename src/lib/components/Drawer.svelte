<script>
	import { drawer } from '$data/misc';
	import { DRAWER_LINKS } from '$data/links';

	$: checked = $drawer;
</script>

<div class="drawer h-screen">
	<input
		id="main-drawer"
		type="checkbox"
		class="drawer-toggle"
		bind:checked
		on:change={drawer.toggle}
	/>
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="main-drawer" class="drawer-overlay" />
		<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
			{#each DRAWER_LINKS as link}
				<li><a href={link.link}>{link.name}</a></li>
			{/each}
		</ul>
	</div>
</div>
