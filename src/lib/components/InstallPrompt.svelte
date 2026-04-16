<script>
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';

	let showBanner = false;
	let isSafari = false;
	let deferredPrompt = null;
	let autoHideTimer;

	function dismiss() {
		showBanner = false;
		localStorage.setItem('install-prompt-dismissed', 'true');
	}

	async function installChromium() {
		if (!deferredPrompt) return;
		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		deferredPrompt = null;
		if (outcome === 'accepted') dismiss();
	}

	function onBeforeInstallPrompt(e) {
		e.preventDefault();
		deferredPrompt = e;
	}

	onMount(() => {
		const isStandalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			/** @type {any} */ (navigator).standalone;
		const dismissed = localStorage.getItem('install-prompt-dismissed');
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

		if (isStandalone || dismissed || !isMobile) return;

		isSafari =
			/Safari/i.test(navigator.userAgent) && !/Chrome|CriOS|Chromium/i.test(navigator.userAgent);

		window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);

		setTimeout(() => {
			showBanner = true;
		}, 5000);

		autoHideTimer = setTimeout(() => {
			dismiss();
		}, 20000);
	});

	onDestroy(() => {
		clearTimeout(autoHideTimer);
		if (typeof window !== 'undefined') {
			window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
		}
	});
</script>

{#if showBanner}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		transition:fly={{ y: 50, duration: 300 }}
		class="fixed bottom-4 left-4 right-4 mx-auto max-w-sm z-30
		       rounded-xl bg-base-200 shadow-lg p-4 text-sm cursor-pointer"
		on:click={dismiss}
		role="status"
	>
		<p class="m-0 mb-2 font-medium">
			Vidste du, at du kan installere Spejderbogen som app? Så virker den også uden internet!
		</p>

		{#if isSafari}
			<p class="m-0 opacity-70">
				Tryk på <strong>Del</strong>-knappen
				<span class="inline-block translate-y-px">&#xFEFF;&#8683;</span>
				og vælg <strong>&ldquo;Føj til hjemmeskærm&rdquo;</strong>
			</p>
		{:else if deferredPrompt}
			<button class="btn btn-primary btn-sm mt-1" on:click|stopPropagation={installChromium}>
				Installer som app
			</button>
		{:else}
			<p class="m-0 opacity-70">
				Tryk på menuen (<strong>&#8942;</strong>) og vælg
				<strong>&ldquo;Installer app&rdquo;</strong>
			</p>
		{/if}
	</div>
{/if}
