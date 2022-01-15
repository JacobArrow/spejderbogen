import { writable } from 'svelte/store';

export const title = writable('Spejderhjælpen');
export function setTitle(value) {
	title.set(value);
}
