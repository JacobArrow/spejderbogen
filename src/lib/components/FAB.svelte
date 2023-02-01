<script>
	import { scrollPosition } from '$lib/data/misc';
</script>

<div
	class="fixed z-50 right-0 md:right-8 2xl:right-14 mb-4 sm:mb-6 md:mb-8 2xl:mb-10 w-full md:w-min"
	style="bottom:{$scrollPosition.footerOffset}px"
>
	<slot />
</div>
