<script>
  let { meme } = $props();

  let a = $derived({
    href: `//assets.calliander.net/${meme.hrefDirectory}/${meme.hrefFilename}`,
    target: meme.isVideo ? undefined : '_blank'
  });

  let img = $derived({
    src: `//assets.calliander.net/${meme.srcDirectory}/${meme.srcFilename}`,
    alt: meme.name,
    width: 345
  });
</script>

<li class="max-w-[345px]">
  <a {...a} class="grid gap-4 no-underline text-[#b3b5b7]">
    <img {...img} />

    <div class="grid text-center">
      <strong class="text-2xl underline decoration-2">{meme.name}</strong>
      <span>{meme.type} / {meme.fileSize} {meme.sizeLabel}</span>
    </div>
  </a>
</li>
