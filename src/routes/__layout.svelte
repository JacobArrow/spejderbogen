<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />
<main class="p-4 sm:p-10 md:p-10 lg:p-10">
	<slot />
</main>
