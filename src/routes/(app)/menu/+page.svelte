<script>
  import { addToCart } from "#lib/cart.ts";
  import { Heart } from "@boxicons/svelte";
  import { goto, preloadData } from "$app/navigation";
  import { onMount } from "svelte";
  import {
    Segmented,
    SegmentedButton,
    Card,
    Sheet,
    Block,
    Button,
    Chip,
    Stepper,
    Toast,
  } from "konsta/svelte";

  let { data } = $props();

  const categories = ["cakes", "snacks"];
  const flavours = [
    "Vanilla",
    "Chocolate",
    "Red Velvet",
    "Coconut",
    "Carrot",
    "Cookies & Cream",
    "Strawberry",
    "Banana",
  ];

  let item = $state(null);
  let sheetOpen = $state(false);
  let flavour = $state("Vanilla");
  let quantity = $state(1);
  let toast = $state(false);
  const price = $derived((item?.price ?? 0) * quantity);

  onMount(() => {
    preloadData("/menu?category=snacks");
    preloadData("/menu?category=cakes");
  });

  const go = (url) => goto(url, { noScroll: true, keepFocus: true });

  function open(menu) {
    item = menu;
    quantity = 1;
    sheetOpen = true;
  }

  function add() {
    addToCart({
      ...item,
      id: crypto.randomUUID(),
      quantity,
      cost: price, // line total, same as before
      ...(item.category === "cake" && { flavour }),
    });
    sheetOpen = false;
    toast = true;
    setTimeout(() => (toast = false), 2500);
  }
</script>

<svelte:head>
  <title>Menu | Hadeva Bakes</title>
  <meta
    name="description"
    content="Browse our full menu of cakes, snacks and drinks."
  />
</svelte:head>

<Block class="!my-3">
  <Segmented strong rounded class="mx-auto max-w-md">
    <SegmentedButton
      strong
      rounded
      active={!data.category}
      onClick={() => goto("/menu")}
    >
      All
    </SegmentedButton>
    {#each categories as cat}
      <SegmentedButton
        strong
        rounded
        active={data.category === cat}
        onClick={() => goto(`/menu?category=${cat}`)}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1)}
      </SegmentedButton>
    {/each}
  </Segmented>
</Block>

<div class="mx-auto grid max-w-screen-xl grid-cols-2 gap-2 px-2 md:grid-cols-4">
  {#each data.menu as menu}
    <div
      role="button"
      tabindex="0"
      onclick={() => open(menu)}
      onkeydown={(e) => e.key === "Enter" && open(menu)}
      class="cursor-pointer"
    >
      <Card
        margin="m-0"
        contentWrapPadding="p-0"
        class="h-full overflow-hidden"
      >
        <img
          alt={menu.name}
          src={menu.imageUrl}
          class="h-24 w-full object-cover"
        />
        <div class="p-3">
          <h3 class="text-xl font-bold text-primary">{menu.name}</h3>
          {#if menu.size}
            <h4 class="mt-1 text-sm font-bold text-primary">
              {menu.size} Inches, {menu.layers} Layers
            </h4>
          {/if}
          <p class="mt-2 text-xs leading-relaxed opacity-70">
            {menu.description}
          </p>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-lg font-bold text-amber-500"
              >₦{menu.price.toLocaleString()}</span
            >
            <Heart pack="filled" class="text-stone-400" />
          </div>
        </div>
      </Card>
    </div>
  {/each}
</div>

<Sheet
  class="pb-safe"
  opened={sheetOpen}
  onBackdropClick={() => (sheetOpen = false)}
>
  {#if item}
    <Block class="space-y-4">
      <div class="flex items-center gap-4">
        <img
          alt={item.name}
          src={item.imageUrl}
          class="size-24 shrink-0 rounded-2xl object-cover"
        />
        <div class="min-w-0 flex-1">
          <h3 class="text-xl font-bold text-primary">{item.name}</h3>
          {#if item.size}
            <p class="text-sm font-semibold text-primary">
              {item.size} Inches · {item.layers} Layers
            </p>
          {/if}
          <p class="mt-1 line-clamp-2 text-xs opacity-70">{item.description}</p>
          <span class="mt-1 block text-lg font-bold text-amber-500"
            >₦{item.price.toLocaleString()}</span
          >
        </div>
      </div>

      {#if item.category === "cake"}
        <p class="text-xs font-semibold uppercase tracking-wider opacity-60">
          Flavour
        </p>
        <div class="flex flex-wrap gap-2">
          {#each flavours as f}
            <Chip outline={f !== flavour} onclick={() => (flavour = f)}
              >{f}</Chip
            >
          {/each}
        </div>
      {/if}

      <div class="flex items-center gap-4">
        <Stepper
          rounded
          value={quantity}
          onMinus={() => quantity > 1 && quantity--}
          onPlus={() => quantity++}
        />
        <Button large rounded class="flex-1" onClick={add}>
          Add to Cart · ₦{price.toLocaleString()}
        </Button>
      </div>
    </Block>
  {/if}
</Sheet>

<Toast position="center" opened={toast}>
  <div class="shrink">Added to cart ✓</div>
</Toast>

<style>
  :global(.k-card) {
    width: 45vw;
    margin: auto;
  }
</style>
