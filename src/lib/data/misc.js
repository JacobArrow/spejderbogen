import { writable } from 'svelte/store';
import { DEFAULT_TITLE } from './env';

function createNavTitelStore() {
	const navTitel = writable(DEFAULT_TITLE);
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
		drawer.set(false);
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

function createNetworkStatusStore() {
	const isOnline = writable(false);

	function set(bool) {
		isOnline.set(bool);
	}

	const { subscribe } = isOnline;
	return {
		subscribe,
		set
	};
}

export const isOnline = createNetworkStatusStore();
