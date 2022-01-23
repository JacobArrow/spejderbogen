<script>
	import '../app.css';
	import Navbar from '$components/Navbar.svelte';
	import Drawer from '$components/Drawer.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	let title = `${import.meta.env.VITE_DEFAULT_TITLE}`;

	// navTitel.subscribe((value) => {
	// 	title = value;
	// });

	//required for themeChange
	onMount(() => {
		themeChange(false);
	});
</script>

<Drawer>
	<Navbar {title} />
	<main class="prose p-4 max-w-none pt-20 sm:p-10 sm:pt-28">
		<div class="container mx-auto scroll-smooth">
			<slot />
		</div>
	</main>
</Drawer>
