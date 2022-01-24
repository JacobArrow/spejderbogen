<script>
	import { page } from '$app/stores';
	import { navTitel } from '$data/misc';
	import { decode } from '$functions/convertUrl';
	navTitel.setNavTitel($page.params.id);

	const slug = $page.params.id;
</script>

<svelte:head>
	<title>{import.meta.env.VITE_DEFAULT_TITLE} - {decode(slug)}</title>
</svelte:head>

<p>Sang: {decode(slug)}</p>
