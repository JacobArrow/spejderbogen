<script>
	//Components
	import Search from './Search.svelte';

	//Icons
	import MenuIcon from 'svelte-material-icons/Menu.svelte';
	import SunIcon from 'svelte-material-icons/WeatherSunny.svelte';
	import MoonIcon from 'svelte-material-icons/WeatherNight.svelte';

	//Misc
	import { page } from '$app/stores';
	import { NAVBAR_LINKS } from '$data/links';
	import { drawer } from '$data/misc';

	export let title = '';
</script>

<div
	class="navbar shadow-lg bg-neutral text-neutral-content flex inset-x-0 sticky top-0 w-full z-50"
>
	<div class="flex-none xl:hidden sm:flex">
		<button
			class="btn btn-square btn-ghost stroke-current"
			aria-label="menu"
			on:click={drawer.toggle}
		>
			<MenuIcon size="24px" />
		</button>
	</div>
	<div class="pr-2 hidden xl:flex">
		<a href="/" class="btn btn-ghost text-2xl font-bold uppercase"> {title} </a>
	</div>
	<div class="form-control flex-1 w-full relative mx-2 sm:mx-0">
		<Search />
	</div>
	<div class="xl:flex hidden items-stretch gap-1 mx-2">
		{#each NAVBAR_LINKS as link}
			<a
				href={link.link}
				class="btn btn-ghost btn-md rounded-btn text-base"
				class:btn-active={$page.url.pathname === link.link}
			>
				{link.name}
			</a>
		{/each}
	</div>
	<div class="justify-end items-end">
		<button
			class="btn btn-square btn-ghost swap swap-rotate"
			data-toggle-theme="dark,light"
			data-act-class="swap-active"
			aria-label="theme switch"
		>
			<span class="swap-on">
				<SunIcon size="24px" />
			</span>
			<span class="swap-off">
				<MoonIcon size="24px" />
			</span>
		</button>
	</div>
</div>

<style lang="scss">
	.btn-outline {
		color: currentColor;
	}
	:global(.theme-toggle) {
		@apply hidden;
	}
	:global(html[data-theme='light']) {
		& button.moon {
			@apply inline-flex;
		}
	}
	:global(html[data-theme='dark']) {
		& button.sun {
			@apply inline-flex;
		}
		& .navbar input:not(:focus) {
			@apply bg-base-300;
		}
	}
</style>
