<script>
	import MenuIcon from 'svelte-material-icons/Menu.svelte';
	import DotsVetIcon from 'svelte-material-icons/DotsVertical.svelte';
	import SunIcon from 'svelte-material-icons/WeatherSunny.svelte';
	import MoonIcon from 'svelte-material-icons/WeatherNight.svelte';

	export let title = '';
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
	<div class="flex-none">
		<button class="btn btn-square btn-ghost stroke-current">
			<MenuIcon size="24px" />
		</button>
	</div>
	<div class="flex-1 px-2 mx-2">
		<span class="text-lg font-bold"><a href="/"> {title} </a></span>
	</div>
	<div class="flex-none">
		<button
			class="theme-toggle btn btn-square btn-ghost sun"
			data-set-theme="light"
			data-act-class="active"
		>
			<SunIcon size="24px" />
		</button>
		<button
			class="theme-toggle btn btn-square btn-ghost moon"
			data-set-theme="dark"
			data-act-class="active"
		>
			<MoonIcon size="24px" />
		</button>
	</div>
</div>

<style lang="scss" global>
	button.theme-toggle {
		@apply hidden;
	}
	html[data-theme='light'] {
		& button.moon {
			@apply inline-flex;
		}
	}
	html[data-theme='dark'] {
		& button.sun {
			@apply inline-flex;
		}
	}
</style>
