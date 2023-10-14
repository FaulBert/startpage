<script>
	import { onMount } from 'svelte';
	let time = new Date();
	let dateString;
	
	// these automatically update when `time`
	// changes, because of the `$:` prefix
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();
	$: month = '' + time.toLocaleString("en-US", { month:"long"});
  $: day = time.toLocaleDateString('en-us', { weekday:"long"});
  $: dayNum = '' + time.getDate();
  $: year = time.getFullYear();
  
	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		
		return () => {
			clearInterval(interval);
      if (month.length < 2) {
        month = '0' + month;
      }
      if (dayNum.length < 2) {
        dayNum = '0' + dayNum;
      }
		};
	});
</script>

<main class="text-left left-5 absolute mx-auto top-3 text-gray-400 md:top-10">
  <p class="text-3xl md:text-7xl">{hours}:{minutes}:{seconds}</p>
</main>

<main class="text-right right-5 absolute mx-auto top-3 text-gray-400 md:top-10">
  <p class="text-3xl md:text-7xl">{month}/{dayNum}</p>
  <p class="text-xs md:text-2xl">{day.toUpperCase()}, {year}</p>
</main>