<script>
  import { enhance } from "$app/forms";
  import { cartStore, clearCart } from "$lib/cart";

  let { form, data } = $props();
  
  let customerName = $state(data.user?.name);
  let customerPhone = $state(data.user?.username);
  let deliveryType = $state("pickup");
  let address = $state("");
  let notes = $state("");
  let submitting = $state(false);

  let total = $derived($cartStore.reduce((sum, i) => sum + i.cost, 0));
</script>

{#if $cartStore.length === 0 && !form?.success}
  <p class="p-6 text-center text-surface-tint">Your cart is empty.</p>
{:else if form?.success}
  <div class="p-6 flex flex-col items-center gap-4 text-center">
    <h2 class="text-xl font-bold">Order placed!</h2>
    <p class="text-sm text-surface-tint">Tap below to confirm your order over WhatsApp.</p>
    <a
      href={form.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onclick={() => clearCart()}
      class="rounded-xl bg-amber-500 text-black font-bold px-6 py-4 w-[80vw] text-center"
    >
      Confirm on WhatsApp
    </a>
  </div>
{:else}
  <form
    method="POST"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
    class="p-4 pb-24 flex flex-col gap-4"
  >
    <input type="hidden" name="items" value={JSON.stringify($cartStore)} />

    {#if form?.error}
      <p class="text-red-500 text-sm">{form.error}</p>
    {/if}

    <div>
      <label class="block text-sm font-medium mb-1" for="customerName">Name</label>
      <input id="customerName" name="customerName" bind:value={customerName} required
        class="border rounded-xl px-3 py-2 w-full" />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1" for="customerPhone">Phone number</label>
      <input id="customerPhone" name="customerPhone" bind:value={customerPhone} required
        class="border rounded-xl px-3 py-2 w-full" />
    </div>

    <div>
      <span class="block text-sm font-medium mb-1">Delivery method</span>
      <div class="flex gap-4 text-sm">
        <label class="flex items-center gap-2">
          <input type="radio" name="deliveryType" value="pickup" bind:group={deliveryType} />
          Pickup
        </label>
        <label class="flex items-center gap-2">
          <input type="radio" name="deliveryType" value="delivery" bind:group={deliveryType} />
          Delivery
        </label>
      </div>
    </div>

    {#if deliveryType === "delivery"}
      <div>
        <label class="block text-sm font-medium mb-1" for="address">Delivery address</label>
        <textarea id="address" name="address" bind:value={address} required
          class="border rounded-xl px-3 py-2 w-full"></textarea>
      </div>
    {/if}

    <div>
      <label class="block text-sm font-medium mb-1" for="notes">Notes (optional)</label>
      <textarea id="notes" name="notes" bind:value={notes}
        class="border rounded-xl px-3 py-2 w-full"></textarea>
    </div>

    <div class="flex justify-between font-bold text-lg pt-2 border-t">
      <span>Total</span>
      <span>₦{total.toLocaleString()}</span>
    </div>

    <button type="submit" disabled={submitting}
      class="rounded-xl bg-amber-500 text-black font-bold px-6 py-4 disabled:opacity-50">
      {submitting ? "Placing order…" : "Place order"}
    </button>
  </form>
{/if}
