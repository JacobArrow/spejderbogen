<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { navTitel } from '$lib/data/misc.js';

	let title = import.meta.env.VITE_DEFAULT_TITLE;

	// navTitel.subscribe((value) => {
	// 	title = value;
	// });
</script>

<Navbar {title} />
<main class="prose p-4 sm:p-10 md:p-10 lg:p-10">
	<slot />
</main>
