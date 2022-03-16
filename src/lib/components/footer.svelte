<script>
	import InstagramIcon from 'svelte-material-icons/Instagram.svelte';
	import FacebookIcon from 'svelte-material-icons/Facebook.svelte';
	const date = new Date();
</script>

<footer class="px-4 py-2 bg-primary text-neutral-content flex w-full fixed bottom-0">
	<p class="text-lg">
		Design og udvikling af <strong><a href="https://youtech.dk" target="_blank">YouTech</a></strong>
    </p>
	<div class="ml-auto flex gap-2 justify-end">
		<a href="https://www.instagram.com/baptistspejder/?hl=en" target="_blank"><InstagramIcon width="30" height="30" /></a>
		<a href="https://www.facebook.com/DanskeBaptistersSpejderkorps" target="_blank"><FacebookIcon width="30" height="30" /></a>
	</div>
</footer>