import { writable } from "svelte/store";

/**
 * @param {string} key key of local storage
 * @param {string} initial initial value
 */
export const localStore = (key, initial) => {
  const toString = (value) => JSON.stringify(value, null, 2);
  const toObj = JSON.parse;

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, toString(initial));
  }

  const saved = toObj(localStorage.getItem(key));

  const { subscribe, set, update } = writable(saved);

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem(key, toString(value));
      return set(value);
    },
    update,
  };
};
