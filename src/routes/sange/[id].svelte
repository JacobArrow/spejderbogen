<script>
	import { page } from '$app/stores';
	import { navTitel } from '$lib/data/misc';
	navTitel.setNavTitel($page.params.id);

	const slug = $page.params.id;
</script>

<p>{slug}</p>
