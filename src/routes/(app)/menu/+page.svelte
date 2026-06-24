<script>
  import { addToCart } from "$lib/cart";
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
  console.log(data.category);
  let flavour = $state("Vanilla");
  let quantity = $state(1);
  let item = $state();
  let name = $state();
  let price = $derived(item?.price * quantity);
  let toast = $state(false);

  function showToast() {
    toast = true;
    setTimeout(() => (toast = false), 2000);
  }
</script>

<svelte:head>
  <title>Menu | Hadeva Bakes</title>
  <meta
    name="description"
    content="Browse our full menu of cakes, snacks and drinks."
  />
</svelte:head>
{#if toast}
  <div
    class="fixed top-56 left-1/2 -translate-x-1/2 z-50 bg-[#f54504] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-lg"
  >
    Added to cart ✓
  </div>
{/if}
{#if item}
  <!-- content here -->
  <div class="p-2 py-25 absolute bg-stone-900">
    <div>
      <!-- Main Feature -->

      <div
        class=" p-1.5 absolute top-20 group overflow-hidden grid grid-rows-[auto_auto_1fr_auto] rounded-3xl border border-white/5 bg-stone-900/50 transition-all duration-300 md:focus:border-amber-500/30 md:col-span-2 w-[95vw]"
      >
        <div class="relative h-36 flex flex-row justify-between items-center">
          <img
            alt={item?.name}
            class="h-20 w-20 rounded-3xl object-cover transition-transform duration-700 group-active:scale-110"
            src={item?.imageUrl}
          />
          <div class="flex flex-col w-[40vw] pr-1 whitespace-normal">
            <h3
              class="text-2xl text-primary font-bold"
              style="font-family: 'Plus Jakarta Sans', sans-serif;"
            >
              {item?.name}
            </h3>
            <h4
              class=" text-body-md font-bold text-white"
              style="font-family: 'Plus Jakarta Sans', sans-serif;"
            >
              {#if item?.size}
                {item?.size} Inches, {item?.layers} Layers
              {/if}
            </h4>
            <p class=" text-xs leading-relaxed text-stone-500">
              {item?.description}
            </p>
          </div>
          <span class="text-lg font-bold text-amber-500"
            >₦{item?.price.toLocaleString()}</span
          >
        </div>
        <hr />
        <div>
          {#if item.category == "cake"}
            {#each flavourGroups.cake as item}
              <button
                onclick={() => (flavour = item)}
                class="
    px-4 py-2.25 rounded-full
    text-[13px]
    tracking-[0.01em]
    font-['DM_Sans']
    cursor-pointer
    transition-all
    duration-200
    border-[1.5px]
  "
                class:border-[#e85d8a]={item == flavour}
                class:bg-[rgba(232,93,138,0.15)]={item == flavour}
                class:text-[#e85d8a]={item == flavour}
                class:font-semibold={item == flavour}
                class:scale-[1.02]={item == flavour}
                class:border-[rgba(255,255,255,0.12)]={item !== flavour}
                class:bg-[rgba(255,255,255,0.04)]={item !== flavour}
                class:text-[rgba(255,255,255,0.65)]={item !== flavour}
                class:font-normal={!item}>{item}</button
              >
            {/each}
          {/if}
        </div>
        <div class="p-2">
          <span class="flex items-center justify-between rounded-2md ]">
            <div><h5>Quantity</h5></div>
            <div class="w-40 bg-black justify-between items-center flex h-10">
              <button
                onclick={() => quantity--}
                class="bg-[#0a0a0a] w-10 rounded-2xl"
                ><h4 class="text-2xl">-</h4></button
              >
              <h6>{quantity}</h6>
              <button
                class="bg-[#0a0a0a] w-10 rounded-2xl"
                onclick={() => quantity++}><h4 class="text-2xl">+</h4></button
              >
            </div>
          </span>
          <br />
          <div class="flex mt-1.5 items-center justify-center">
            <button
              class="  flex items-center justify-center rounded-2xl transform bg-primary h-10 w-[80vw] text-white transition-transform flavour:scale-90"
              onclick={() => {
                item.category == "cake"
                  ? addToCart({
                      ...item,
                      id: crypto.randomUUID(),
                      flavour,
                      quantity,
                      cost: price,
                    })
                  : addToCart({
                      ...item,
                      id: crypto.randomUUID(),
                      quantity,
                      cost: price,
                    });
                item = 0;
                showToast();
              }}
              ><span class="material-symbols-outlined"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                  <path
                    d="M17.31 14H9.72L5.95 2.68A1 1 0 0 0 5 2H2v2h2.28l3.54 10.63A2 2 0 0 0 9.72 16h7.59a2 2 0 0 0 1.87-1.3l2.76-7.35-1.87-.7zM10 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"
                  ></path><path
                    d="m11.71 7.29-1.42 1.42 2.71 2.7 4.71-4.7-1.42-1.42L13 8.59z"
                  ></path>
                </svg></span
              >

              <h5>Add to Cart - ₦{price.toLocaleString()}</h5>
            </button>
          </div>
        </div>
        <button
          onclick={() => (item = 0)}
          class="material-symbols-outlined text-stone-400 active:text-[#f54504]"
          >X</button
        >
      </div>
    </div>
  </div>
{:else}
  <div
    class=" w-[90vw] ml-[5vw] justify-between gap-2 flex rounded-full border border-white/5 bg-stone-900 px-4 py-2 text-sm font-semibold tracking-wide active:bg-stone-800"
  >
    <a href="/menu">
      <span
        class="cursor-pointer rounded-full border border-white/5 bg-stone-900 px-4 py-2 text-sm font-semibold tracking-wide active:bg-stone-800"
        class:text-amber-500={!data.category}
        class:text-stone-400={data.category}>All</span
      >
    </a>
    <a href="/menu?category=cake"
      ><span
        class="cursor-pointer rounded-full border border-white/5 bg-stone-900 px-4 py-2 text-sm font-semibold tracking-wide active:bg-stone-800"
        class:text-stone-400={data.category !== "cake"}
        class:text-amber-500={data.category == "cake"}>Cakes</span
      ></a
    >
    <a href="/menu?category=snacks">
      <span
        class="cursor-pointer rounded-full border border-white/5 bg-stone-900 px-4 py-2 text-sm font-semibold tracking-wide active:bg-stone-800"
        class:text-stone-400={data.category !== "snacks"}
        class:text-amber-500={data.category == "snacks"}>Snacks</span
      >
    </a>
  </div>
  <div class="p-2 pb-18">
    <div class="grid grid-cols-2 gap-1 md:grid-cols-12">
      <!-- Main Feature -->
      {#each data.menu as menu}
        <div
        role="button"
        tabindex="0"
          onclick={() => (item = menu)}
          class="group cursor-pointer overflow-hidden grid grid-rows-[auto_auto_1fr_auto] rounded-3xl border border-white/5 bg-stone-900/50 transition-all duration-300 active:border-amber-500/30"
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
              class="mb-2 text-2xl font-bold text-secondary"
              style="font-family: 'Plus Jakarta Sans', sans-serif;"
            >
              {menu.name}
            </h3>
            {#if menu.size}
              <h4
                class="mb-2 text-body-md font-bold text-secondary"
                style="font-family: 'Plus Jakarta Sans', sans-serif;"
              >
                {menu.size} Inches, {menu.layers} Layers
              </h4>
            {/if}
            <p class="mb-4 text-xs leading-relaxed text-on-primary">
              {menu.description}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-amber-500">
                ₦{menu.price.toLocaleString()}
              </span>
              <button
                class="material-symbols-outlined text-stone-400 active:text-[#f54504]"
              >
                favorite
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
