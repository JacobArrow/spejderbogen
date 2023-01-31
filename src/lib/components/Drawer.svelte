<script>
	//Icons
	import CloseIcon from 'svelte-material-icons/Close.svelte';

	//Misc
	import { onMount } from 'svelte';
	import { drawer, scrollPosition } from '$data/misc';
	import { DRAWER_LINKS } from '$data/links';
	import { page } from '$app/stores';
	export let title = '';

	function setScroll(target) {
		scrollPosition.set({
			scrollTop: target.scrollTop,
			scrollHeight: target.scrollHeight,
			clientHeight: target.clientHeight,
			clientWidth: target.clientWidth,
			visibleFooter: isInViewport(document.getElementById('footer'))
		});
	}

	function isInViewport(el) {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const drawer = document.getElementById('drawer-content');
			setScroll(drawer);
		});

		resizeObserver.observe(document.body);
		return () => resizeObserver.unobserve(document.body);
	});
</script>

<div class="drawer h-screen">
	<input
		id="main-drawer"
		type="checkbox"
		class="drawer-toggle hidden"
		bind:checked={$drawer}
		on:change={drawer.toggle}
	/>
	<div
		on:scroll={(scroll) => setScroll(scroll.target)}
		class="drawer-content overflow-y-scroll scroll-smooth"
		id="drawer-content"
	>
		<slot />
	</div>
	<div class="drawer-side">
		<label for="main-drawer" class="drawer-overlay" />
		<div class="menu overflow-y-auto w-72 bg-base-100">
			<div class="navbar shadow-lg bg-neutral text-neutral-content flex w-full justify-center">
				<div class="navbar-start">
					<button
						aria-label="Close"
						class="btn btn-square btn-ghost stroke-current"
						on:click={drawer.toggle}><CloseIcon size="24px" /></button
					>
				</div>
				<div class="navbar-center">
					<a href="/" class="btn btn-ghost text-xl font-bold uppercase"> {title} </a>
				</div>
				<div class="navbar-end" />
			</div>
			<ul class="p-4 text-base-content">
				{#each DRAWER_LINKS as link}
					<li on:click={drawer.close}>
						<a
							href={link.link}
							class="btn btn-ghost justify-start text-base"
							class:btn-active={$page.url.pathname === link.link}
							><span class="mr-2"><svelte:component this={link.icon} size="24px" /></span>
							{link.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
