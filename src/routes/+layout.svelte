<script>
	import '../app.css';
	import Navbar from '$components/Navbar.svelte';
	import Drawer from '$components/Drawer.svelte';
	import SunCalc from 'suncalc';
	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { isOnline } from '$data/misc';
	import { DEFAULT_TITLE, VERCEL_ENV } from '$data/env';
	import createLocalDatabase from '$data/db';
	import Footer from '$components/Footer.svelte';
	dayjs.extend(isBetween);

	const lng = 55.6761;
	const lat = 12.5683;
	let online = false;
	$: isOnline.set(online);

	const times = SunCalc.getTimes(new Date(), lng, lat);
	const isDark = dayjs().isBetween(dayjs(times.sunset), dayjs(times.sunrise).add(1, 'day'));

	let title = `${DEFAULT_TITLE}`;

	function disableLogsInProduction() {
		if (VERCEL_ENV === 'production') {
			console.log = function () {};
		}
	}

	onMount(async () => {
		//set theme to dark if it's night
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		themeChange(false);
		disableLogsInProduction();
		await createLocalDatabase();
	});
</script>

<Drawer {title}>
	<Navbar {title} />
	<main class="prose p-4 max-w-none sm:p-10 overflow-x-hidden relative">
		<div class="container mx-auto">
			<slot />
		</div>
	</main>
	<Footer />
</Drawer>

<svelte:window bind:online />

<style lang="scss">
	main {
		min-height: calc(100vh - 36px - 64px);
		@media (min-width: 640px) {
			min-height: calc(100vh - 44px - 64px);
		}
	}
</style>
