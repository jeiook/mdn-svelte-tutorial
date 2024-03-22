import { writable } from 'svelte/store';

export const localStore = (key: string, initial: unknown) => {
	const toString = (value: unknown) => JSON.stringify(value, null, 2);
	const toObj = JSON.parse;

	if (typeof localStorage === 'undefined') {
		return;
	}

	if (localStorage.getItem(key) === null) {
		localStorage.setItem(key, toString(initial));
	}

	const saved = toObj(localStorage.getItem(key) as string);

	const { subscribe, set, update } = writable(saved);

	return {
		subscribe,
		set: (value: string) => {
			localStorage.setItem(key, toString(value));
			return set(value);
		},
		update
	};
};
