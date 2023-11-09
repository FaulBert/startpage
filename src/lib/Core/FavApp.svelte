<script>
  import { onMount } from 'svelte'
  import { fade, slide } from 'svelte/transition'
  import { localApps } from '$lib/Stores/FavApp.js'

  let open = false;
  function toggle() {
    open = !open // when click, open into true, from true into !true
  }
  
  $: localApps.set(apps);

  let apps = $localApps;
  let appForm = false;
  let appName = '';
  let appUrl = 'https://';
  let appIcon = '';
  let appId = null;
  
  function submitApp(event) {
    const googleIcon = `https://s2.googleusercontent.com/s2/favicons?domain=${appUrl}&sz=32`;
    const id = appId ?? apps.length;
  
    apps[id] = {
      id,
      name: appName,
      url: appUrl,
      icon: appIcon || googleIcon
    };
    appForm = false;
    appName = '';
    appUrl = 'http://';
    appIcon = '';
    appId = null;
  }

  function removeApp(id) {
    apps.splice(id, 1);
    apps = apps;
  }
  
  function editApp(app) {
    appForm = true;
    appName = app.name;
    appUrl = app.url;
    appIcon = app.icon;
    appId = app.id;
  }
</script>

<button
  on:click={toggle}
  class={'fixed right-5 bottom-3'}>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" viewBox="0 0 48 48">
    <path fill="hsl(0, 0%, 63.9%)" d="M25 19.01L28.99 23H25v-3.99Zm5.245-13.765L25 10.49v-.24A4.25 4.25 0 0 0 20.75 6h-10.5A4.25 4.25 0 0 0 6 10.25v27.5A4.25 4.25 0 0 0 10.25 42h27.5A4.25 4.25 0 0 0 42 37.75v-10.5A4.25 4.25 0 0 0 37.75 23h-.24l5.245-5.244a4.25 4.25 0 0 0 0-6.01l-6.5-6.5a4.25 4.25 0 0 0-6.01 0ZM33.294 25.5h4.456c.967 0 1.75.784 1.75 1.75v10.5a1.75 1.75 0 0 1-1.75 1.75H25v-14h8.294ZM10.25 8.5h10.5c.966 0 1.75.784 1.75 1.75V23h-14V10.25c0-.966.784-1.75 1.75-1.75Zm12.25 17v14H10.25a1.75 1.75 0 0 1-1.75-1.75V25.5h14Z" />
  </svg>
</button>

<div class={ !open ? 'hidden': ''}>
  <div class="fixed inset-x-1 md:overflow-x-auto bottom-14 md:bottom-10 md:inset-x-5 text-gray-300 backdrop-blur-md">
    {#each apps as app, i (app.id)}
      <div
        class="w-[70px] h-[70px] md:w-[95px] md:h-[95px] relative group p-3 rounded hover:scale-110 transition-transform inline-block"
        transition:fade={{ duration: 200 }}>
        <button
          class="invisible group-hover:visible absolute z-10 -top-3 left-0 scale-90 sm:scale-75 p-1 px-2.5 rounded-full bg-white/75"
          on:click={() => removeApp(i)}>
          <i class="fa fa-close text-red-500" />
        </button>
        <a href={app.url} class="text-xs max-w-[7ch] truncate text-neutral-200 text-center">
          <img
            class="mx-auto mb-2 rounded"
            src={app.icon}
            alt={app.name}
            width="40"
            height="40"
          />
          {app.name}
        </a>
        <button
          class="invisible group-hover:visible absolute z-10 -top-3 right-0 scale-90 sm:scale-75 p-1 px-2.5 rounded-full bg-white/75"
          on:click={() => editApp(app)}>
          <i class="fa fa-pencil" />
        </button>
      </div>
    {/each}

    {#if apps.length < 10}
      <button
        class="w-7 h-7 p-3 rounded transition-opacity opacity-25 hover:opacity-100 inline-block"
        on:click={() => (appForm = !appForm)}
      >
        <i class="fa fa-plus-square text-white fa-2x m-auto" />
      </button>
    {/if }
  </div>
</div>

{#if appForm}
  <form
    transition:slide
    class="flex rounded text-xs w-fit max-md:top-1/4 max-md:left-1/4 md:max-auto md:mt-5 absolute"
    autocomplete="off"
    on:submit|preventDefault={submitApp}
  >
    <div class="flex flex-col">
      <input bind:value={appId} type="hidden" />
      <input
        bind:value={appName}
        class="bg-white/80 p-2 rounded-tl border-l-2 border-t-2 border-blue-400 invalid:border-red-400 outline-0"
        type="text"
        placeholder="Name*"
        required
      />
      <input
        bind:value={appUrl}
        class="bg-white/80 p-2 border-l-2 border-blue-400 invalid:border-red-400 outline-0"
        type="url"
        placeholder="URL*"
        required
      />
      <input
        bind:value={appIcon}
        class="bg-white/80 p-2 rounded-bl border-l-2 border-b-2 border-blue-400 outline-0"
        type="url"
        placeholder="Icon URL"
      />
    </div>
    <button class="bg-blue-400 px-4 rounded-r border-2 border-blue-400" type="submit">
      <i class="fa fa-angle-right fa-2x text-white" />
    </button>
  </form>
{/if }