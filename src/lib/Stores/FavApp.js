import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initApps = browser && localStorage?.apps ? JSON.parse(localStorage.apps): [];

export const localApps = writable(initApps);

localApps.subscribe((value) => {
  if (browser) {
    localStorage.apps = JSON.stringify(value);
  }
});