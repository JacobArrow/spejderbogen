<script>
	import Error from "$lib/components/Error.svelte";
	import { page } from '$app/stores';
</script>

<Error statusCode={$page.status} errorMessage={$page.error.message} />