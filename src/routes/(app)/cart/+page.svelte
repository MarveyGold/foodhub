<script>
  import { cartStore, syncCart, removeItem } from "$lib/cart";
  $effect(() => syncCart());
  console.log($cartStore);
</script>

{#if $cartStore.length == 0}
  <!-- content here -->

  <section
    id="cart"
    class="py-20 px-6 h-[80vh] w-[95vw] flex flex-col items-center justify-between"
  >
    <h2>Cart Is Empty</h2>
    <div>
      <p>Oops! Looks like your cart is empty.</p>
      <p>Check out the menu and add your favourite items to the cart</p>
    </div>
    <a href="/menu">
      <button
        class="transform rounded-xl border-2 border-amber-500 bg-transparent px-6 py-4 text-lg font-bold text-amber-500 transition-all hover:bg-amber-500/10 active:scale-95 w-[80vw]"
      >
        View Menu
      </button>
    </a>
  </section>
{/if}
<div class="p-4 pb-24">
  <h2 class="text-2xl font-bold text-white mb-6">Your Cart</h2>

  <div class="flex flex-col gap-4">
    {#each $cartStore as item}
      <div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-stone-900 p-3">
        <img
          src={item.imageUrl}
          alt={item.name}
          class="h-16 w-16 rounded-xl object-cover"
        />
        <div class="flex-1">
          <h3 class="font-bold text-white">{item.name}
            {#if item.flavour}
              <span class="text-stone-400 font-normal text-sm">({item.flavour})</span>
            {/if}
          </h3>
          <p class="text-xs text-amber-500 font-bold">₦{item.cost.toLocaleString()}</p>
          <p class="text-xs text-stone-500">Qty: {item.quantity}</p>
        </div>
        <button
          onclick={() => removeItem(item)}
          aria-label="Remove item"
          class="flex items-center justify-center h-10 w-10 rounded-full bg-red-500/10 text-red-400 active:bg-red-500/30 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z"/>
          </svg>
        </button>
      </div>
    {/each}
  </div>
</div>
