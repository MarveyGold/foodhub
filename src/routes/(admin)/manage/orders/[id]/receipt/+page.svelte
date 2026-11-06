<script lang="ts">
  import { page } from "$app/state";
  import Receipt from "#lib/components/Receipt.svelte";
  import { getReceiptOrder, markOrderPaid } from "../../data.remote";

  const id = $derived(page.params.id!);
  const q = $derived(getReceiptOrder(id));
</script>

<svelte:head>
  <title>Receipt {id.slice(-6).toUpperCase()}</title>
</svelte:head>

<div class="min-h-screen bg-neutral-100 p-4 pb-24 print:bg-white print:p-0">
  <div
    class="mx-auto mb-4 flex max-w-[600px] flex-wrap items-center justify-between gap-3 print:hidden"
  >
    <a href="/manage/orders" class="text-sm text-neutral-600">← Back</a>

    {#if q.current}
      <div class="flex flex-wrap items-center gap-2">
        {#if !q.current.payment?.paidAt}
          <form {...markOrderPaid} class="flex items-center gap-2">
            <input {...markOrderPaid.fields.id.as("hidden", id)} />
            <select
              {...markOrderPaid.fields.method.as("select")}
              class="rounded-lg border bg-white px-2 py-2 text-sm"
            >
              <option value="" disabled selected>Payment method</option>
              <option value="bank_transfer">Bank transfer</option>
              <option value="cash">Cash</option>
              <option value="pos">POS</option>
              <option value="card">Card</option>
            </select>
            <button
              disabled={!!markOrderPaid.pending}
              class="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              Mark as paid
            </button>
          </form>
        {/if}
        <button
          onclick={() => window.print()}
          class="rounded-lg bg-[#D93F00] px-4 py-2 text-sm font-semibold text-white"
        >
          Print / Save as PDF
        </button>
      </div>
    {/if}
  </div>

  {#each markOrderPaid.fields.method.issues() ?? [] as issue}
    <p class="mx-auto mb-3 max-w-[600px] text-sm text-red-600 print:hidden">
      {issue.message}
    </p>
  {/each}

  {#if q.error}
    <p class="text-center text-sm text-red-600">Couldn't load this order.</p>
  {:else if q.current}
    <Receipt order={q.current} />
  {:else}
    <p class="text-center text-sm text-neutral-500">Loading receipt…</p>
  {/if}
</div>
