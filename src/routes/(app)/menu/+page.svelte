<script lang="ts">
  import { addToCart, type CartItem } from "#lib/cart.ts";
  import { Heart } from "@boxicons/svelte";
  import { goto } from "$app/navigation";
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
  import type { PageProps } from "./$types";

  type MenuItem = PageProps["data"]["menu"][number];

  const categories = ["cakes", "snacks"] as const;
  const flavours = [
    "Vanilla",
    "Chocolate",
    "Red Velvet",
    "Coconut",
    "Carrot",
    "Cookies & Cream",
    "Strawberry",
    "Banana",
  ] as const;
  type Flavour = (typeof flavours)[number];

  let { data }: PageProps = $props();

  let item = $state<MenuItem | null>(null);
  let sheetOpen = $state(false);
  let flavour = $state<Flavour>("Vanilla");
  let quantity = $state(1);
  let toast = $state(false);

  const price = $derived((item?.price ?? 0) * quantity);

  // Per-card flavour overrides: menuId -> flavour
  let cardFlavours = $state<Record<string, Flavour>>({});

  const go = (url: string) => goto(url, { noScroll: true, keepFocus: true });

  function open(menu: MenuItem) {
    item = menu;
    quantity = 1;
    // If the user already picked a flavour on the card, carry it in.
    if (menu.category === "cake" && cardFlavours[menu._id]) {
      flavour = cardFlavours[menu._id];
    }
    sheetOpen = true;
  }

  function add() {
    if (!item) return;
    addToCart({
      ...item,
      id: crypto.randomUUID(),
      quantity,
      cost: price, // line total
      ...(item.category === "cake" && { flavour }),
    });
    sheetOpen = false;
    toast = true;
    setTimeout(() => (toast = false), 2500);
  }

  // Quick-add straight from the card (uses the card's flavour, or default)
  function quickAdd(menu: MenuItem, e: MouseEvent) {
    e.stopPropagation(); // don't open the sheet
    const chosen =
      menu.category === "cake"
        ? (cardFlavours[menu._id] ?? "Vanilla")
        : undefined;
    addToCart({
      ...menu,
      id: crypto.randomUUID(),
      quantity: 1,
      cost: menu.price,
      ...(chosen && { flavour: chosen }),
    });
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
  {#each data.menu as menu (menu._id)}
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

      {#if menu.category === "cake"}
        <div
          class="mt-2 flex flex-wrap gap-1"
          onclick={(e) => e.stopPropagation()}
        >
          {#each flavours as f}
            <Chip
              outline={cardFlavours[menu._id] !== f}
              onClick={() => (cardFlavours[menu._id] = f)}
            >
              {f}
            </Chip>
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
