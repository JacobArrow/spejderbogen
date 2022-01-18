<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { navTitel } from '$lib/data/misc.js';
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

<Navbar {title} />
<main class="prose p-4 max-w-none pt-20 sm:p-10 sm:pt-28">
	<slot />
</main>
