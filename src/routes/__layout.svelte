<script>
	import '../app.css';
	import Navbar from '$components/Navbar.svelte';
	import Drawer from '$components/Drawer.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { isOnline } from '$data/misc';
	import { DEFAULT_TITLE } from '$data/env';
	import createLocalDatabase from '$data/db';

	let online = false;
	$: isOnline.set(online);

	let title = `${DEFAULT_TITLE}`;

	function disableLogsInProduction() {
		if (import.meta.env.VITE_VERCEL_ENV === 'production') {
			console.log = function () {};
		}
	}

	onMount(async () => {
		themeChange(false);
		disableLogsInProduction();
		await createLocalDatabase();
	});
</script>

<Drawer {title}>
	<Navbar {title} />
	<main class="prose p-4 max-w-none sm:p-10">
		<div class="container mx-auto scroll-smooth">
			<slot />
		</div>
	</main>
</Drawer>

<svelte:window bind:online />
