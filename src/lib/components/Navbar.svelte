<script>
	//Components
	import Search from './Search.svelte';

	//Icons
	import MenuIcon from 'svelte-material-icons/Menu.svelte';
	import SunIcon from 'svelte-material-icons/WeatherSunny.svelte';
	import MoonIcon from 'svelte-material-icons/WeatherNight.svelte';

	import { NAVBAR_LINKS } from '$data/links';
	import { drawer } from '$data/misc';

	export let title = '';
</script>

<div class="navbar shadow-lg bg-neutral text-neutral-content flex fixed w-full z-50">
	<div class="flex-none md:hidden sm:flex">
		<button class="btn btn-square btn-ghost stroke-current" on:click={drawer.toggle}>
			<MenuIcon size="24px" />
		</button>
	</div>
	<div class="px-2 mr-2 hidden md:flex">
		<span class="text-lg font-bold uppercase"><a href="/"> {title} </a></span>
	</div>
	<div class="form-control flex-1 w-full relative mx-2 sm:mx-0">
		<Search />
	</div>
	<div class="md:flex hidden items-stretch">
		{#each NAVBAR_LINKS as link}
			<a href={link.link} class="btn btn-ghost btn-sm lg:btn-md rounded-btn text-base">
				{link.name}
			</a>
		{/each}
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
