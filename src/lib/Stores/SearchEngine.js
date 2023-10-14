import { browser } from '$app/environment';
import { writable } from "svelte/store";

const defaultSearchEngines = {
  default: 0,
  engines: [
    {
      id: 0,
      name: "Bing",
      alias: "b:",
      url: "https://bing.com/search?q=",
    },
  ],
};

const initSearchEngines =
  browser && localStorage?.searchEngines
    ? JSON.parse(localStorage.searchEngines)
    : defaultSearchEngines;

export const localSearchEngines = writable(initSearchEngines);

localSearchEngines.subscribe((value) => {
  if (browser) {
    localStorage.searchEngines = JSON.stringify(value);
  }
});
