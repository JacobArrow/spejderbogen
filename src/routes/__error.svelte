<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status: status,
				message: error.message
			}
		};
	}
</script>

<script>
	export let status;
	export let message;
</script>

<svelte:head>
	<title>{import.meta.env.VITE_DEFAULT_TITLE} - Fejl: {status}</title>
</svelte:head>

<div class="card text-center shadow-2xl max-w-3xl m-auto">
	<div class="px-10 pt-10">
		<h1 class="text-9xl mb-0">{status}</h1>
	</div>
	<div class="card-body pt-3">
		<h2 class="card-title mt-0">Hovsa, der skete en fejl</h2>
		<code class="text-center">
			{message}
		</code>
		<div class="justify-center card-actions">
			<a href="/" class="btn btn-primary no-underline text-white">TILBAGE</a>
		</div>
	</div>
</div>
