<script>
  import AlataFont from '$lib/assets/fonts/alata.woff2';
  import CaveatBrushFont from '$lib/assets/fonts/caveat-brush.woff2';
  import '../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <link
    rel="preload"
    href={AlataFont}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <link
    rel="preload"
    href={CaveatBrushFont}
    as="font"
    type="font/woff2"
    crossorigin="anonymous"
  />
  <title>lol.calliander.net</title>
  <meta name="robots" content="noai, noimageai" />
</svelte:head>

{@render children()}
