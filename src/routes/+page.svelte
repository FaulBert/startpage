<script>
  import Time from '$lib/Core/Time.svelte';
  import Search from '$lib/Core/Search.svelte';
  import FavApp from '$lib/Core/FavApp.svelte';
  import '../app.css';
</script>

<main class="min-h-screen relative z-20 container mx-auto flex flex-col justify-center items-center">
  <Time/>
  <Search/>
  <FavApp/>
</main>