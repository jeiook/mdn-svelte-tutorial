import { writable, type Writable } from 'svelte/store';
import type { JsonValue } from './types/json.type';

export const localStore = <T extends JsonValue>(key: string, initial: T): Writable<T> => {
	const toString = (value: T) => JSON.stringify(value, null, 2);
	const toObj = JSON.parse;

	if (typeof localStorage === 'undefined') {
		// temporary solution for localStore being called before components have mounted
		return writable();
	}

	if (localStorage.getItem(key) === null) {
		localStorage.setItem(key, toString(initial));
	}

	const saved = toObj(localStorage.getItem(key) as string);

	const { subscribe, set, update } = writable(saved);

	return {
		subscribe,
		set: (value: T) => {
			localStorage.setItem(key, toString(value));
			return set(value);
		},
		update
	};
};
