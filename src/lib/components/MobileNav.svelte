<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  let active = $derived(page.url.pathname.slice(1));
</script>

<nav
  class="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/5 bg-stone-950 px-6 py-3"
>
  <button
    onclick={() => goto("/menu")}
    class={active == "menu"
      ? "flex flex-col items-center text-amber-500"
      : "flex flex-col items-center text-stone-500"}
  >
    <span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
        <path
          d="M10 9H8V2H6v7H4V2H2v8c0 1.65 1.35 3 3 3h1v9h2v-9h1c1.65 0 3-1.35 3-3V2h-2zm8-7c-2.4 0-4 3.76-4 6.25 0 2.21 1.28 4.05 3 4.58V22h2v-9.17c1.72-.53 3-2.37 3-4.58C22 5.76 20.4 2 18 2"
        ></path>
      </svg></span
    >
    <span class="mt-1 text-[10px] tracking-tighter uppercase">Menu</span>
  </button>
  <button
    class="relative -mt-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-950 bg-[#f54504] shadow-2xl shadow-[#C41E3A]/40"
    onclick={() => goto("/cart")}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
      <path
        d="M21 4H6.17l-.18-1.15A1 1 0 0 0 5 2H2v2h2.14l1.87 12.15A1 1 0 0 0 7 17h12v-2H7.86l-.31-2H19c.45 0 .84-.3.96-.73l2-7A1 1 0 0 0 21 3.99Zm-2.75 7H7.24l-.77-5h13.2l-1.43 5ZM8 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m9 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"
      ></path>
    </svg>
  </button>
  <button
    onclick={() => goto("/orders")}
    class={active == "orders"
      ? "flex flex-col items-center text-amber-500"
      : "flex flex-col items-center text-stone-500"}
  >
    <span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
        <path
          d="M21 11h-3V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3v-6c0-.55-.45-1-1-1M5 19c-.55 0-1-.45-1-1V5h12v13a3 3 0 0 0 .17 1zm15-1c0 .55-.45 1-1 1s-1-.45-1-1v-5h2z"
        ></path><path d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z"></path>
      </svg></span
    >
    <span class="mt-1 text-[10px] tracking-tighter uppercase">Orders</span>
  </button>
</nav>
