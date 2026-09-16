<script>
  let { meme } = $props();
</script>

<li class="max-w-[345px]">
  <a
    href={meme.href}
    target={meme.isVideo ? undefined : '_blank'}
    class="grid gap-4 no-underline text-[#b3b5b7]">
    <img src={meme.src} alt={meme.name} width="345" />

    <div class="grid text-center">
      <strong class="text-2xl underline decoration-2">{meme.name}</strong>
      <span>{meme.type} / {meme.fileSize} {meme.sizeLabel}</span>
    </div>
  </a>
</li>
