<script>
  import { addToCart } from "$lib/cart";
  import { Heart } from "@boxicons/svelte";
  const flavourGroups = {
    cake: [
      "Vanilla",
      "Chocolate",
      "Red Velvet",
      "Coconut",
      "Carrot",
      "Cookies & Cream",
      "Strawberry",
      "Banana",
    ],
  };
  let { data } = $props();
  let flavour = $state("Vanilla");
  let quantity = $state(1);
  let item = $state();
  let price = $derived(item?.price * quantity);
  let toast = $state(false);

  function showToast() {
    toast = true;
    setTimeout(() => (toast = false), 2000);
  }
</script>

<svelte:head>
  <title>Menu | Hadeva Bakes</title>
  <meta name="description" content="Browse our full menu of cakes, snacks and drinks." />
</svelte:head>

{#if toast}
  <div class="fixed top-56 left-1/2 -translate-x-1/2 z-50 bg-primary text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg">
    Added to cart ✓
  </div>
{/if}

{#if item}
  <!-- Backdrop -->
  <button
    class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
    onclick={() => (item = 0)}
    aria-label="Close"
  ></button>

  <div class="fixed z-50 pb-26 bottom-0 left-0 right-0 rounded-t-3xl bg-orange-50 p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
    <!-- Handle -->
    <div class="mx-auto mb-4 h-1 w-10 rounded-full bg-stone-300"></div>

    <!-- Product header -->
    <div class="flex gap-4 items-center mb-4">
      <img
        alt={item?.name}
        class="h-24 w-24 rounded-2xl object-cover shadow-md flex-shrink-0"
        src={item?.imageUrl}
      />
      <div class="flex-1 min-w-0">
        <h3
          class="text-xl font-bold text-(--color-primary)"
          style="font-family: 'Plus Jakarta Sans', sans-serif;"
        >
          {item?.name}
        </h3>
        {#if item?.size}
          <p class="text-sm font-semibold text-(--color-primary) mt-0.5">
            {item?.size} Inches · {item?.layers} Layers
          </p>
        {/if}
        <p class="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
          {item?.description}
        </p>
        <span class="text-lg font-bold text-amber-500 mt-1 block">
          ₦{item?.price.toLocaleString()}
        </span>
      </div>
    </div>

    <!-- Flavour picker -->
    {#if item.category === "cake"}
      <p class="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Flavour</p>
      <div class="flex flex-wrap gap-2 mb-4">
        {#each flavourGroups.cake as f}
          <button
            onclick={() => (flavour = f)}
            class="px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-150"
            class:border-[#e85d8a]={f === flavour}
            class:bg-[rgba(232,93,138,0.12)]={f === flavour}
            class:text-[#e85d8a]={f === flavour}
            class:border-stone-200={f !== flavour}
            class:bg-white={f !== flavour}
            class:text-stone-600={f !== flavour}
          >{f}</button>
        {/each}
      </div>
    {/if}

    <!-- Quantity + CTA -->
    <div class="flex items-center gap-3 mt-2">
      <!-- Quantity control -->
      <div class="flex items-center gap-3 bg-orange-100 border border-orange-200 rounded-2xl px-3 py-2">
        <button
          onclick={() => { if (quantity > 1) quantity-- }}
          class="text-xl font-bold text-stone-500 w-6 text-center leading-none"
        >−</button>
        <span class="text-base font-bold text-(--color-primary) w-5 text-center">{quantity}</span>
        <button
          onclick={() => quantity++}
          class="text-xl font-bold text-stone-500 w-6 text-center leading-none"
        >+</button>
      </div>

      <!-- Add to cart -->
      <button
        class="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-(--color-primary) h-12 text-white font-semibold text-sm transition-transform active:scale-95"
        onclick={() => {
          item.category === "cake"
            ? addToCart({ ...item, id: crypto.randomUUID(), flavour, quantity, cost: price })
            : addToCart({ ...item, id: crypto.randomUUID(), quantity, cost: price });
          item = 0;
          showToast();
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.31 14H9.72L5.95 2.68A1 1 0 0 0 5 2H2v2h2.28l3.54 10.63A2 2 0 0 0 9.72 16h7.59a2 2 0 0 0 1.87-1.3l2.76-7.35-1.87-.7zM10 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"/>
          <path d="m11.71 7.29-1.42 1.42 2.71 2.7 4.71-4.7-1.42-1.42L13 8.59z"/>
        </svg>
        Add to Cart · ₦{price.toLocaleString()}
      </button>
    </div>
  </div>
{/if}

<!-- Category tabs -->
<div class="w-[90vw] ml-[5vw] justify-between gap-2 flex rounded-full border border-white/5 bg-stone-900 px-4 py-2 text-sm font-semibold tracking-wide active:bg-stone-800">
  <a href="/menu">
    <span
      class="cursor-pointer rounded-full border border-white/5 bg-stone-900 px-4 py-2 text-sm font-semibold tracking-wide active:bg-stone-800"
      class:text-amber-500={!data.category}
      class:text-stone-400={data.category}
    >All</span>
  </a>
  <a href="/menu?category=cake">
    <span
      class="cursor-pointer rounded-full border border-white/5 bg-stone-900 px-4 py-2 text-sm font-semibold tracking-wide active:bg-stone-800"
      class:text-stone-400={data.category !== "cake"}
      class:text-amber-500={data.category === "cake"}
    >Cakes</span>
  </a>
  <a href="/menu?category=snacks">
    <span
      class="cursor-pointer rounded-full border border-white/5 bg-stone-900 px-4 py-2 text-sm font-semibold tracking-wide active:bg-stone-800"
      class:text-stone-400={data.category !== "snacks"}
      class:text-amber-500={data.category === "snacks"}
    >Snacks</span>
  </a>
</div>

<!-- Menu grid -->
<div class="p-2 pb-18">
  <div class="grid grid-cols-2 gap-1 md:grid-cols-12">
    {#each data.menu as menu}
      <div
        role="button"
        tabindex="0"
        onclick={() => (item = menu)}
        onkeydown={(e) => e.key === "Enter" && (item = menu)}
        class="group cursor-pointer shadow-lg overflow-hidden grid grid-rows-[auto_auto_1fr_auto] rounded-3xl border border-surface-container bg-surface transition-all duration-300 active:border-amber-500/30"
      >
        <div class="relative h-24 overflow-hidden">
          <img
            alt={menu.name}
            class="h-full w-full object-cover transition-transform duration-700 group-active:scale-110"
            src={menu.imageUrl}
          />
        </div>
        <div class="p-2">
          <h3
            class="mb-2 text-2xl font-bold text-(--color-primary)"
            style="font-family: 'Plus Jakarta Sans', sans-serif;"
          >
            {menu.name}
          </h3>
          {#if menu.size}
            <h4
              class="mb-2 text-body-md font-bold text-(--color-primary)"
              style="font-family: 'Plus Jakarta Sans', sans-serif;"
            >
              {menu.size} Inches, {menu.layers} Layers
            </h4>
          {/if}
          <p class="mb-4 text-xs leading-relaxed text-surface-tint">
            {menu.description}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-amber-500">
              ₦{menu.price.toLocaleString()}
            </span>
            <button class="text-stone-400 active:text-[#f54504]">
              <Heart pack="filled" />
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
