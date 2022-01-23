import { writable } from 'svelte/store';

function createNavTitelStore() {
	const navTitel = writable(import.meta.env.VITE_DEFAULT_TITLE);
	function setNavTitel(value) {
		navTitel.set(value);
	}

	const { subscribe } = navTitel;
	return {
		subscribe,
		setNavTitel
	};
}

export const navTitel = createNavTitelStore();

function createDrawerStore() {
	const drawer = writable(false);

	function open() {
		drawer.set(true);
	}

	function close() {
		drawer.set(true);
	}

	function toggle() {
		drawer.update((n) => !n);
	}

	const { subscribe } = drawer;
	return {
		subscribe,
		open,
		close,
		toggle
	};
}

export const drawer = createDrawerStore();
