<script>
  import { enhance } from '$app/forms';
  let { data } = $props();
</script>

<main class="p-4 max-w-lg mx-auto">
  <h2 class="text-2xl font-bold mb-6">Manage Menu</h2>

  <div class="flex flex-col gap-4">
    {#each data.menu as product}
      <div class="flex items-center gap-3 rounded-2xl border border-white/10 bg-stone-900 p-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          class="h-16 w-16 rounded-xl object-cover"
        />
        <div class="flex-1">
          <h3 class="font-bold text-white">{product.name}</h3>
          <p class="text-xs text-stone-400">{product.category} · ₦{product.price.toLocaleString()}</p>
          {#if product.size}
            <p class="text-xs text-stone-500">{product.size} inches · {product.layers} layers</p>
          {/if}
        </div>
        <form method="POST" action="?/delete" use:enhance>
          <input type="hidden" name="_id" value={product._id} />
          <button
            type="submit"
            class="flex items-center justify-center h-10 w-10 rounded-full bg-red-500/10 text-red-400 active:bg-red-500/30 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z"/>
            </svg>
          </button>
        </form>
      </div>
    {/each}
  </div>
</main>
