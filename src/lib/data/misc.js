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
