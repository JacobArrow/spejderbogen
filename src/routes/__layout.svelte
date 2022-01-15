<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { title as titleStore } from '../lib/data/misc';

	let title;

	titleStore.subscribe((value) => {
		title = value;
	});
</script>

<Navbar title={$title} />
<main class="p-4 sm:p-10 md:p-10 lg:p-10">
	<slot />
</main>
