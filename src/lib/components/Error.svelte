<script>
    import { DEFAULT_TITLE } from '$data/env';

    export let statusCode = 404;
    export let errorMessage = "Siden findes ikke";
</script>

<svelte:head>
	<title>{DEFAULT_TITLE} - Fejl: {statusCode}</title>
</svelte:head>

<div class="card text-center shadow-2xl max-w-3xl m-auto">
	<div class="px-10 pt-10">
		<h1 class="text-9xl mb-0">{statusCode}</h1>
	</div>
	<div class="card-body pt-3">
		<h2 class="card-title m-auto">Hovsa, der skete en fejl</h2>
		<code class="text-center my-4">
			{errorMessage}
		</code>
		<div class="justify-center card-actions">
			<a href="/" class="btn btn-primary no-underline">TILBAGE</a>
		</div>
	</div>
</div>