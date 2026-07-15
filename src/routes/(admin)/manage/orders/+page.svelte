<script>
  import { enhance } from "$app/forms";

  let { data, form } = $props();

  let toast = $state(false);
  $effect(() => {
    if (form?.success || form?.error) {
      toast = true;
      setTimeout(() => (toast = false), 2000);
    }
  });

  function statusColor(status) {
    if (status === "completed") return "bg-green-500/10 text-green-400";
    if (status === "cancelled") return "bg-red-500/10 text-red-400";
    if (status === "pending") return "bg-stone-500/10 text-stone-400";
    return "bg-amber-500/10 text-amber-400";
  }
</script>

<main class="mx-auto max-w-lg p-4 pb-24">
  <h2 class="mb-2 text-2xl font-bold text-(--color-on-background)">Orders</h2>
  <p class="mb-6 text-sm text-on-background">{data.orders.length} total</p>

  <div class="flex flex-col gap-4">
    {#each data.orders as order (order._id)}
      <div class="rounded-2xl border border-surface-container bg-surface p-4">
        <div class="mb-2 flex items-center justify-between">
          <div>
            <span class="text-sm font-bold text-primary">
              #{order._id.slice(-6).toUpperCase()}
            </span>
            <p class="text-xs text-surface-tint">{order.customerName} · {order.customerPhone}</p>
          </div>
          <span
            class={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusColor(order.status)}`}
          >
            {order.status}
          </span>
        </div>

        <div class="flex flex-col gap-1">
          {#each order.items as item}
            <p class="text-xs text-surface-tint">
              {item.quantity}x {item.name}{item.flavour ? ` (${item.flavour})` : ""} — ₦{item.cost.toLocaleString()}
            </p>
          {/each}
        </div>

        <div class="mt-3 flex items-center justify-between border-t border-surface-container pt-3">
          <span class="text-sm font-bold text-amber-500">₦{order.total.toLocaleString()}</span>

          <form method="POST" action="?/updateStatus" use:enhance>
            <input type="hidden" name="_id" value={order._id} />
            <select
              name="status"
              value={order.status}
              onchange={(e) => e.target.form.requestSubmit()}
              class="rounded-lg border border-surface-container bg-surface px-2 py-1 text-xs text-primary focus:outline-none"
            >
              {#each data.statuses as status}
                <option value={status}>{status}</option>
              {/each}
            </select>
          </form>
        </div>
      </div>
    {:else}
      <p class="py-12 text-center text-sm text-surface-tint">No orders yet</p>
    {/each}
  </div>
</main>

{#if toast}
  <div
    class="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-stone-900 px-4 py-2 text-sm text-white shadow-lg"
  >
    {form?.error ?? "Updated"}
  </div>
{/if}
