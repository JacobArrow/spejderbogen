<script>
	import { scrollPosition } from '$lib/data/misc';

	let scrollY = 0;
	let isBottom = false;
	let bottom = 20;
	let maxBottom = 50;
	let minBottom = 20;

	function normalize(number, inMax, inMin = 0) {
		return ((number - inMin) * (maxBottom - minBottom)) / (inMax - inMin) + minBottom;
	}

	function calculateScrollPosition(position) {
		const maxScroll = position.scrollHeight - position.clientHeight;
		scrollY = position.scrollTop;
		isBottom = position.scrollTop >= maxScroll;
		bottom = normalize(scrollY, maxScroll);
	}

	$: $scrollPosition.scrollTop > 0 ? calculateScrollPosition($scrollPosition) : null;
</script>

<div class="fixed z-50 right-0 md:right-8 2xl:right-14 sm:mb-6 w-full md:w-min" style="bottom:{$scrollPosition.visibleFooter ? 50 : bottom}px">
	<slot />
</div>
