<script>
  import Header from "$lib/components/Header.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  let { children } = $props();
  let active = $derived(page.url.pathname.split("/")[1]);
</script>

<Header mode="admin" />
{@render children()}
<nav
  class="fixed bottom-0 left-0 z-50 flex md:hidden w-full items-center justify-around border-t border-white/5 bg-background px-6 py-3"
>
  <a href="/manage"
    class={active == "manage"
      ? "flex flex-col items-center text-amber-500"
      : "flex flex-col items-center text-stone-500"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm0 8h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm0-18v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1z"
      />
    </svg>
    <span class="mt-1 text-[10px] tracking-tighter uppercase">Manage</span>
  </a>

  <a
    href="/add-menu"
    class={active == "add-menu"
      ? "flex flex-col items-center text-amber-500"
      : "flex flex-col items-center text-stone-500"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
    </svg>
    <span class="mt-1 text-[10px] tracking-tighter uppercase">Add</span>
  </a>

  <a
    href="/delete"
    class={active == "delete"
      ? "flex flex-col items-center text-amber-500"
      : "flex flex-col items-center text-stone-500"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z"
      />
    </svg>
    <span class="mt-1 text-[10px] tracking-tighter uppercase">Menu</span>
  </a>

  <a
    href="/manage/orders"
    class={active == "orders"
      ? "flex flex-col items-center text-amber-500"
      : "flex flex-col items-center text-stone-500"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 11h-3V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3v-6c0-.55-.45-1-1-1M5 19c-.55 0-1-.45-1-1V5h12v13a3 3 0 0 0 .17 1zm15-1c0 .55-.45 1-1 1s-1-.45-1-1v-5h2z"
      /><path d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z" />
    </svg>
    <span class="mt-1 text-[10px] tracking-tighter uppercase">Orders</span>
  </a>
</nav>
