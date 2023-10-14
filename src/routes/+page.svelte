<script>
  import Time from '$lib/Core/Time.svelte';
  import Library from '$lib/Core/Library.svelte';
  import Search from '$lib/Core/Search.svelte';
  import App from '$lib/Core/App.svelte';
  import '../app.css';
</script>

<main>
  <!-- Header for Time and Search Bar -->
  <header class="h-[45vh] relative">
    <Time/>
    <Search/>
  </header>
  
  <!-- Main section, for Bookmark, App, and others -->
  <section class="top-1/2 z-20 container mx-auto flex flex-col justify-center items-center">
    <div class="mx-auto">
      <Library/>
    </div>
    <div class="fixed right-3 md:right-1/2 md:left-1/2 bottom-5">
      <App/>
    </div>
  </section>
</main>