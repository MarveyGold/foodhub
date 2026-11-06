<script lang="ts">
  import {
    BUSINESS,
    formatNaira,
    formatDate,
    receiptNo,
    amountInWords,
    paymentLabel,
    type ReceiptOrder,
  } from "#lib/utils/receipt";

  let { order }: { order: ReceiptOrder } = $props();
  const paid = $derived(!!order.payment?.paidAt);
</script>

<div
  class="mx-auto flex min-h-[860px] w-[600px] max-w-full flex-col overflow-hidden bg-white font-['Plus_Jakarta_Sans',Arial,sans-serif] text-[#1B1818] [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
>
  <div class="h-3.5 bg-[#D93F00]"></div>

  <!-- header -->
  <div class="flex items-start justify-between px-12 pt-10">
    <div class="flex items-center gap-3.5">
      <img
        src="/images/logo.png"
        alt="{BUSINESS.name} logo"
        class="size-16 object-contain"
      />
      <div class="flex flex-col gap-1.5">
        <div class="text-[34px] font-extrabold tracking-tight text-[#D93F00]">
          {BUSINESS.name}
        </div>
        <div class="text-[13px] font-medium text-[#7A4A32]">
          {BUSINESS.tagline}
        </div>
      </div>
    </div>
    <div class="flex flex-col items-end gap-1 text-right">
      <div class="text-xs font-bold tracking-[2px] text-[#7A4A32]">
        PAYMENT RECEIPT
      </div>
      <div class="text-sm font-medium">No. {receiptNo(order._id)}</div>
      <div class="text-sm font-medium">
        Issued {formatDate(new Date().toISOString())}
      </div>
    </div>
  </div>

  <!-- customer + stamp -->
  <div
    class="mx-12 mt-8 flex items-center justify-between rounded-2xl bg-[#FFECD2] px-6 py-5"
  >
    <div class="flex flex-col gap-1">
      <div class="text-xs font-bold tracking-[2px] text-[#7A4A32]">
        RECEIVED FROM
      </div>
      <div class="text-[28px] font-extrabold">{order.customerName}</div>
    </div>
    {#if paid}
      <div
        class="-rotate-6 rounded-[10px] border-[3px] border-[#1B7A3E] px-4 py-1.5 text-xl font-extrabold tracking-[3px] text-[#1B7A3E]"
      >
        PAID
      </div>
    {/if}
  </div>

  <!-- items -->
  <div class="mx-12 mt-9 flex flex-col">
    <div
      class="flex border-b-2 border-[#1B1818] pb-2.5 text-xs font-bold tracking-[2px] text-[#7A4A32]"
    >
      <div class="flex-1">DESCRIPTION</div>
      <div class="w-[60px] text-center">QTY</div>
      <div class="w-[130px] text-right">AMOUNT</div>
    </div>
    {#each order.items as item}
      <div class="flex items-start border-b border-[#F0D9BE] py-5">
        <div class="flex flex-1 flex-col gap-1">
          <div class="text-lg font-bold">{item.name}</div>
          <div class="text-sm font-medium text-[#7A4A32]">
            {#if item.flavour}{item.flavour} ·
            {/if}{formatNaira(item.cost)} each
          </div>
        </div>
        <div class="w-[60px] text-center text-lg font-bold">
          {item.quantity}
        </div>
        <div class="w-[130px] text-right text-lg font-bold">
          {formatNaira(item.cost * item.quantity)}
        </div>
      </div>
    {/each}
  </div>

  <!-- total -->
  <div
    class="mx-12 mt-7 flex flex-col gap-2 rounded-2xl bg-[#1B1818] p-6 text-white"
  >
    <div class="flex items-baseline justify-between">
      <div class="text-[13px] font-bold tracking-[2px] text-[#FFD9A8]">
        {paid ? "TOTAL PAID" : "TOTAL DUE"}
      </div>
      <div class="text-4xl font-extrabold text-[#FFB066]">
        {formatNaira(order.total)}
      </div>
    </div>
    <div class="text-[13px] font-medium text-[#E8E0D8]">
      {amountInWords(order.total)}
    </div>
  </div>

  <!-- payment details -->
  <div class="mx-12 mt-7 flex gap-8">
    <div class="flex flex-1 flex-col gap-1">
      <div class="text-xs font-bold tracking-[2px] text-[#7A4A32]">
        PAYMENT METHOD
      </div>
      <div class="text-[15px] font-medium">
        {paymentLabel(order.payment?.method)}
      </div>
    </div>
    <div class="flex flex-1 flex-col gap-1">
      <div class="text-xs font-bold tracking-[2px] text-[#7A4A32]">
        PAYMENT DATE
      </div>
      <div class="text-[15px] font-medium">
        {formatDate(order.payment?.paidAt)}
      </div>
    </div>
  </div>

  <div class="flex-1"></div>

  <!-- footer -->
  <div
    class="mx-12 mb-9 mt-8 flex items-end justify-between border-t border-dashed border-[#C9A98A] pt-5"
  >
    <div class="flex flex-col gap-1">
      <div class="text-lg font-extrabold text-[#D93F00]">
        Thank you for choosing {BUSINESS.name}!
      </div>
      <div class="text-[13px] font-medium text-[#7A4A32]">{BUSINESS.phone}</div>
    </div>
    <div class="text-xs font-medium text-[#7A4A32]">
      Issued by {BUSINESS.name}
    </div>
  </div>
</div>
