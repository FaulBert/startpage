<script>
  import { slide } from 'svelte/transition';
  import { localSearchEngines } from '$lib/Stores/SearchEngine.js';

  $: localSearchEngines.set(searchEngines);
  $: defaultSearchEngine = searchEngines.engines[searchEngines.default];
  $: {
    (() => {
      searchEngineAliases = {};
      searchEngines.engines.forEach((engine) => {
        searchEngineAliases[engine.alias] = engine;
      });
    })();
  }

  let searchEngines = $localSearchEngines;
  let searchEngineAliases = {};
  let searchEngineId = undefined;
  let searchEngineName = '';
  let searchEngineAlias = '';
  let searchEngineUrl = 'https://';
  let settingsForm = false;
  let keyword = '';
  let urlfocus = false;

  async function search(event) {
    if (!keyword.length) return;
    let encoded = encodeURIComponent(keyword);
    const aliases = searchEngines.engines
      .filter((engine) => {
        return engine.alias;
      })
      .map((engine) => {
        return '^' + engine.alias;
      });

    if (aliases.length) {
      const regex = new RegExp(aliases.join('|'));
      const match = keyword.match(regex)?.[0];
    
      if (match) {
        let encoded = encodeURIComponent(keyword.replace(match, ''));
        window.open(searchEngineAliases[match].url + encoded, '_self');
        return;
      }
    }

    window.open(defaultSearchEngine.url + encoded, '_self');
  }

  function addSearchEngine() {
    const id = searchEngines.engines.length || 0;

    searchEngines.engines[id] = { id, name: '', url: '' };
    searchEngineId = id;
  }

  function submitSearchEngine(event) {
    const id = searchEngineId ?? searchEngines.engines.length;

    searchEngines.engines[id] = {
      id,
      name: searchEngineName,
      alias: searchEngineAlias,
      url: searchEngineUrl
    };
    searchEngineId = undefined;
    searchEngineName = '';
    searchEngineAlias = '';
    searchEngineUrl = 'https://';
  }

  function removeSearchEngine(id) {
    if (searchEngines.engines.length === 1) return;

    searchEngines.engines.splice(id, 1);
    searchEngines.engines = searchEngines.engines;
  }

  function editSearchEngine(engine) {
    searchEngineId = engine.id;
    searchEngineName = engine.name;
    searchEngineAlias = engine.alias;
    searchEngineUrl = engine.url;
  }
  
  const hideOnFocus = () => {
    document.getElementById('lib').classList.add('hidden');
  }
  const showOnBlur = () => {
    document.getElementById('lib').classList.remove('hidden');
  }
</script>

<div class="absolute bottom-5 inset-x-10 md:inset-x-1/4">
  <form on:submit|preventDefault={search} class="flex justify-center shadow shadow-black shadow-md" autocomplete="off">
    <input
      bind:value={keyword}
      on:focus={hideOnFocus}
      on:blur={showOnBlur}
      class="bg-zinc-700/50 text-white/50 m-0 p-2 focus:outline-none w-[70vw]"
      type="text"
    />
    <button
      on:click={() => (settingsForm = !settingsForm)}
      class="bg-zinc-700/50 px-3"
      type="button"
    >
      <i class="fa fa-gear text-white/50" />
    </button>
    <button class="bg-zinc-700/50 px-4" type="submit">
      <i class="fa fa-search text-white/50" />
    </button>
  </form>
  
  {#if settingsForm}
    <form
      transition:slide
      on:submit|preventDefault={submitSearchEngine}
      class="px-4 py-2 bg-neutral-700/50 text-white/50 rounded mt-3 md:max-w-[50vw] mx-auto"
      autocomplete="off"
    >
      <div class="pb-2 flex justify-between">
        <span class="text-sm my-auto">Select default search engine</span>
        <select
          bind:value={searchEngines.default}
          class="px-2 py-1 text-sm text-neutral-600 mbg-slate-100 border-2 border-solid border-gray-300 rounded focus:border-blue-400 focus:outline-none"
        >
          {#each searchEngines.engines as engine, id (id)}
            <option value={id}>{engine.name}</option>
          {/each}
        </select>
      </div>
      <div class="max-h-48 overflow-y-auto">
        <table class="min-w-full text-left border-1 text-sm">
          <thead class="font-medium">
            <tr>
              <th class="py-2 px-1 text-center">#</th>
              <th>Name</th>
              <th>Alias</th>
              <th>URL</th>
              <th class="text-right">
                <button on:click={addSearchEngine} type="button">
                  <i class="fa fa-plus mx-auto" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {#each searchEngines.engines as engine, id (id)}
              {#if searchEngineId === id}
                <tr class="text-neutral-600 relative">
                  {#if !urlfocus}
                    <td class="py-2 text-center">{id + 1}.</td>
                    <td class="max-w-xs">
                      <input
                        bind:value={searchEngineName}
                        class="p-1 bg-slate-100 rounded outline-0 border-2 border-slate-300 invalid:border-red-400"
                        type="text"
                        size="6"
                        placeholder="Name*"
                        required
                      />
                    </td>
                    <td>
                      <input
                        bind:value={searchEngineAlias}
                        class="p-1 bg-slate-100 rounded outline-0 border-2 border-slate-300"
                        type="text"
                        size="2"
                        placeholder="Alias"
                      />
                    </td>
                  {/if }
                  <td colspan={urlfocus ? '4': '1'}>
                    <input
                      bind:value={searchEngineUrl}
                      on:focus={() => (urlfocus = true)}
                      on:blur={() => (urlfocus = false)}
                      class:min-w-full={urlfocus}
                      class="p-1 bg-slate-100 rounded outline-0 border-2 border-slate-300 invalid:border-red-400"
                      type="url"
                      size="14"
                      placeholder="URL*"
                      required
                    />
                  </td>
                  <td class="text-right">
                    <button class="mx-1" type="submit">
                      <i class="fa fa-check" />
                    </button>
                    {#if searchEngines.engines.length > 1}
                      <button on:click={() => removeSearchEngine(id)} type="button">
                        <i class="fa fa-trash" />
                      </button>
                    {/if }
                  </td>
                </tr>
                {:else }
                <tr>
                  <td class="py-2 text-center">{id + 1}.</td>
                  <td>{engine.name}</td>
                  <td>{engine.alias || 'None'}</td>
                  <td class="max-w-[12ch] truncate">{engine.url}</td>
                  <td class="text-right">
                    <button on:click={() => editSearchEngine(engine)} class="mx-1" type="button">
                      <i class="fa fa-pencil" />
                    </button>
                    {#if searchEngines.engines.length > 1}
                      <button on:click={() => removeSearchEngine(id)} type="button">
                        <i class="fa fa-trash" />
                      </button>
                    {/if }
                  </td>
                </tr>
              {/if }
            {/each}
          </tbody>
        </table>
      </div>
      <small class="text-xs font-extralight">
        * Search query will be inserted at the end of URL
      </small>
    </form>
  {/if }
</div>