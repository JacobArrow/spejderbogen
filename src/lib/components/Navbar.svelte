<script>
	//Components
	import Search from './Search.svelte';

	//Icons
	import MenuIcon from 'svelte-material-icons/Menu.svelte';
	import SunIcon from 'svelte-material-icons/WeatherSunny.svelte';
	import MoonIcon from 'svelte-material-icons/WeatherNight.svelte';

	export let title = '';
</script>

<div class="navbar shadow-lg bg-neutral text-neutral-content flex fixed w-full z-50">
	<div class="flex-none md:hidden sm:flex">
		<button class="btn btn-square btn-ghost stroke-current">
			<MenuIcon size="24px" />
		</button>
	</div>
	<div class="px-2 mx-2 hidden md:flex">
		<span class="text-lg font-bold uppercase"><a href="/"> {title} </a></span>
	</div>
	<div class="form-control flex-1 w-full relative mx-2 sm:mx-0">
		<Search />
	</div>
	<div class="md:flex hidden items-stretch">
		<a href="/sange" class="btn btn-ghost btn-sm lg:btn-md rounded-btn text-base"> Alle sange </a>
		<a href="/kategorier" class="btn btn-ghost btn-sm lg:btn-md rounded-btn text-base">
			Kategorier
		</a>
		<a href="/forfattere" class="btn btn-ghost btn-sm lg:btn-md rounded-btn text-base">
			Forfattere
		</a>
	</div>
	<div class="justify-end items-end">
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
		& .navbar input:not(:focus) {
			@apply bg-base-300;
		}
	}
</style>
