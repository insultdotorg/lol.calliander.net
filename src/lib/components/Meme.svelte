<script>
  let { meme } = $props();

  const {
    extension,
    fileSize,
    hrefDirectory,
    hrefFilename,
    isVideo,
    name,
    sizeLabel,
    srcDirectory,
    srcFilename,
    type
  } = meme;

  const a = {
    href: `//assets.calliander.net/${hrefDirectory}/${hrefFilename}`,
    target: isVideo ? undefined : '_blank'
  };

  const img = {
    src: `//assets.calliander.net/${srcDirectory}/${srcFilename}`,
    alt: name,
    width: 345
  };
</script>

<li class="max-w-[345px]">
  <a {...a} class="grid gap-4 no-underline text-[#b3b5b7]">
    <img {...img} />

    <div class="grid text-center">
      <strong class="text-2xl underline decoration-2">{name}</strong>
      <span>{type} / {fileSize} {sizeLabel}</span>
    </div>
  </a>
</li>
