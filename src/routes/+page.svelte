<script>
  import Meme from '$lib/components/Meme.svelte';

  let { data } = $props();

  const { memes } = data;
</script>

<header class="items-center flex font-serif text-[2rem] h-16 justify-center m-auto max-w-[375px] text-center">lol.calliander.net</header>

<main>
  <ul class="items-center flex flex-wrap gap-8 justify-center m-0 py-16">
    {#each memes as meme}
      <Meme {meme} />
    {/each}
  </ul>
</main>
