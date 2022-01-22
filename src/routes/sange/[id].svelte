<script>
	import { page } from '$app/stores';
	import { navTitel } from '$data/misc';
	import { decode } from '$functions/convertUrl';
	navTitel.setNavTitel($page.params.id);

	const slug = $page.params.id;
</script>

<p>{decode(slug)}</p>
