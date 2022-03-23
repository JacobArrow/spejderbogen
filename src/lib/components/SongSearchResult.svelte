<script>
	//Functions
	import { encode } from '$functions/convertUrl';

	export let song;
</script>

<a class="flex-wrap active:bg-base-300 active:text-base-content px-4 rounded w-full gap-1" href="/sange/{encode(song.item.name)}">
	<div class="flex items-center min-w-0">
		<div class="badge mr-2 badge-primary">{song.item.number}</div>
		<div class="font-bold truncate text-base">{song.item.name}</div>
	</div>
	<div class="flex-none w-full line-clamp-2 text-sm">
		{song.item.text}
	</div>
</a>
