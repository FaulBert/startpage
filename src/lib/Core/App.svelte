<script>
  import { onMount } from 'svelte';
  import { Apps } from '../../config';
  
  let open = false;
  function toggle() {
    open = !open // when click, open into true, from true into !true
  }
</script>

<button on:click={toggle}>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" viewBox="0 0 48 48">
    <path fill="hsl(0, 0%, 63.9%)" d="M25 19.01L28.99 23H25v-3.99Zm5.245-13.765L25 10.49v-.24A4.25 4.25 0 0 0 20.75 6h-10.5A4.25 4.25 0 0 0 6 10.25v27.5A4.25 4.25 0 0 0 10.25 42h27.5A4.25 4.25 0 0 0 42 37.75v-10.5A4.25 4.25 0 0 0 37.75 23h-.24l5.245-5.244a4.25 4.25 0 0 0 0-6.01l-6.5-6.5a4.25 4.25 0 0 0-6.01 0ZM33.294 25.5h4.456c.967 0 1.75.784 1.75 1.75v10.5a1.75 1.75 0 0 1-1.75 1.75H25v-14h8.294ZM10.25 8.5h10.5c.966 0 1.75.784 1.75 1.75V23h-14V10.25c0-.966.784-1.75 1.75-1.75Zm12.25 17v14H10.25a1.75 1.75 0 0 1-1.75-1.75V25.5h14Z" />
  </svg>
</button>

<main class={ !open ? 'hidden': ''}>
  <nav class="fixed inset-y-24 inset-x-0 md:inset-y-[30%] md:inset-x-5 bg-zinc-800/30 text-gray-300 backdrop-blur-md overflow-scroll">
    {#each Object.entries(Apps) as [name, items]}
      <p class="text-center text-lg my-5 md:text-2xl text-blue-400">
        {name}
      </p>
      <div class="grid grid-cols-4 md:grid-cols-6 gap-5 mx-5 md:mx-14 md:my-5">
        {#each items as { name, url, icon }}
          <a href={url} class="text-center text-xs md:text-lg">
            {@html icon}
            {name}
          </a>
        {/each}
      </div>
    {/each}
  </nav>
</main>