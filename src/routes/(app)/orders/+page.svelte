<script>
  let { data } = $props();

  function statusColor(status) {
    if (status === "completed") return "bg-green-500/10 text-green-400";
    if (status === "cancelled") return "bg-red-500/10 text-red-400";
    if (status === "pending") return "bg-stone-500/10 text-stone-400";
    return "bg-amber-500/10 text-amber-400";
  }
</script>

<div class="p-4 pb-24">
  <h2 class="mb-6 text-2xl font-bold text-white">Your Orders</h2>

  {#if data.orders.length === 0}
    <div class="py-20 text-center text-surface-tint">
      <h3 class="mb-2 text-lg font-bold text-primary">No orders yet</h3>
      <p class="text-sm">Your placed orders will show up here.</p>
      <a href="/menu" class="mt-4 inline-block text-amber-500 underline">Browse the menu</a>
    </div>
  {:else}
    <div class="flex flex-col gap-4">
      {#each data.orders as order}
        <div class="rounded-2xl border border-surface-container bg-surface p-4">
          <div class="mb-2 flex items-center justify-between">
            <span class="text-sm font-bold text-primary">
              Order #{order._id.slice(-6).toUpperCase()}
            </span>
            <span
              class={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusColor(order.status)}`}
            >
              {order.status}
            </span>
          </div>

          <div class="flex flex-col gap-1">
            {#each order.items as item}
              <p class="text-xs text-surface-tint">
                {item.quantity}x {item.name}{item.flavour ? ` (${item.flavour})` : ""}
              </p>
            {/each}
          </div>

          <div class="mt-3 flex items-center justify-between border-t border-surface-container pt-2">
            <span class="text-xs text-surface-tint">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
            <span class="text-sm font-bold text-amber-500">₦{order.total.toLocaleString()}</span>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
