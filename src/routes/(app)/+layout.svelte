<script>
  import "../../app.css";
  import {
    App,
    Page,
    Navbar,
    NavbarBackLink,
    Tabbar,
    TabbarLink,
    ToolbarPane,
    Fab,
    Link,
    Popover,
    List,
    ListItem,
  } from "konsta/svelte";
  import { page } from "$app/state";
  import { preloadData } from "$app/navigation";
  import { cartStore } from "#lib/cart.ts";
import { untrack } from "svelte";
import { menuCache, ordersCache } from "#lib/cache.svelte.ts";


  let { children } = $props();

  const path = $derived(page.url.pathname);
  const count = $derived($cartStore.length);
  const user = $derived(page.data.user);

  let popoverOpened = $state(false);
  let popoverTarget = $state(null);
  const openPopover = (target) => {
    popoverTarget = target;
    popoverOpened = true;
  };
  const closePopover = () => (popoverOpened = false);
$effect(() => {
  const signedIn = !!user;
  // untrack: load() reads cache state and would otherwise re-trigger this effect
  untrack(() => {
    menuCache.load();
    if (signedIn) ordersCache.load();
  });
});
  const navClass = (active) =>
    `px-3 py-2 text-sm font-semibold uppercase tracking-tight ${active ? "text-amber-500" : "text-stone-500"}`;
</script>

<App theme="ios" safeAreas>
  <Page class="pb-safe-24 md:pb-6!">
    <Navbar title={path === "/cart/checkout" ? "Checkout" : undefined}>
{#snippet left()}
    {#if path === "/cart/checkout"}
      <NavbarBackLink onclick={() => history.back()} />
    {:else}
      <a href="/menu" class="flex items-center gap-2">
        <img src="/images/logo.png" alt="Hadeva Bakes logo" class="size-8 object-contain" />
        <span class="text-lg font-extrabold tracking-tight text-primary">Hadeva Bakes</span>
      </a>
    {/if}
  {/snippet}

      {#snippet right()}
        <!-- desktop nav (the tabbar is hidden at md and up) -->
        <nav class="hidden items-center md:flex">
          <a href="/menu" class={navClass(path.startsWith("/menu"))}>Menu</a>
          <a href="/orders" class={navClass(path.startsWith("/orders"))}
            >Orders</a
          >
          {#if user?.role === "manager"}
            <a href="/manage" class={navClass(false)}>Manage</a>
          {/if}
          <a
            href="/cart"
            aria-label="Cart"
            class="relative px-3 py-2 {path.startsWith('/cart')
              ? 'text-amber-500'
              : 'text-stone-500'}"
          >
            <svg class="size-6" fill="currentColor" viewBox="0 0 24 24"
              ><path
                d="M21 4H6.17l-.18-1.15A1 1 0 0 0 5 2H2v2h2.14l1.87 12.15A1 1 0 0 0 7 17h12v-2H7.86l-.31-2H19c.45 0 .84-.3.96-.73l2-7A1 1 0 0 0 21 3.99Zm-2.75 7H7.24l-.77-5h13.2l-1.43 5ZM8 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m9 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"
              /></svg
            >
            {#if count > 0}
              <span
                class="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#f54504] text-[10px] font-bold text-white"
                >{count}</span
              >
            {/if}
          </a>
        </nav>

        <Link
          iconOnly
          class="account-link"
          aria-label="Account"
          onClick={() => openPopover(".account-link")}
        >
          <svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"
            />
          </svg>
        </Link>
      {/snippet}
    </Navbar>

    <!-- keeps content from stretching edge to edge on wide screens -->
    <div
      class="mx-auto w-full {path.startsWith('/menu')
        ? 'max-w-screen-xl'
        : 'max-w-3xl'}"
    >
      {@render children()}
    </div>
  </Page>

  <Popover
    opened={popoverOpened}
    target={popoverTarget}
    onBackdropClick={closePopover}
  >
    <List nested>
      {#if user}
        <ListItem title={user.name} subtitle={user.username} />
      {:else}
        <ListItem link title="Sign In" href="/login" onClick={closePopover} />
      {/if}
      {#if user?.role === "manager"}
        <ListItem
          link
          title="Admin Mode"
          href="/manage"
          onClick={closePopover}
        />
      {/if}
    </List>
  </Popover>

  <!-- mobile only -->
  <!-- mobile only -->
  <Tabbar
    labels
    icons
    class="fixed bottom-0 left-0 z-20 overflow-visible! md:hidden"
  >
    <ToolbarPane class="overflow-visible!">
      <TabbarLink href="/menu" active={path.startsWith("/menu")} label="Menu">
        {#snippet icon()}
          <svg class="size-7" fill="currentColor" viewBox="0 0 24 24"
            ><path
              d="M10 9H8V2H6v7H4V2H2v8c0 1.65 1.35 3 3 3h1v9h2v-9h1c1.65 0 3-1.35 3-3V2h-2zm8-7c-2.4 0-4 3.76-4 6.25 0 2.21 1.28 4.05 3 4.58V22h2v-9.17c1.72-.53 3-2.37 3-4.58C22 5.76 20.4 2 18 2"
            /></svg
          >
        {/snippet}
      </TabbarLink>

      <!-- cart: a tab, styled as a raised FAB -->
      <TabbarLink
        href="/cart"
        active={path.startsWith("/cart")}
        linkProps={{ "aria-label": "Cart" }}
        class="overflow-visible!"
        colors={{
          iconBgIos: "",
          iconBgActiveIos: "",
          iconBgMaterial: "",
          iconBgActiveMaterial: "",
        }}
      >
        {#snippet icon()}
          <span
            class="relative -translate-y-5 grid h-16 w-16 min-h-16 min-w-16 shrink-0 aspect-square place-items-center rounded-full border-4 bg-[#f54504] text-white shadow-lg shadow-[#f54504]/40 transition-transform active:scale-95
             {path.startsWith('/cart')
              ? 'border-amber-500'
              : 'border-stone-950'}"
          >
            <svg class="size-6" fill="currentColor" viewBox="0 0 24 24"
              ><path
                d="M21 4H6.17l-.18-1.15A1 1 0 0 0 5 2H2v2h2.14l1.87 12.15A1 1 0 0 0 7 17h12v-2H7.86l-.31-2H19c.45 0 .84-.3.96-.73l2-7A1 1 0 0 0 21 3.99Zm-2.75 7H7.24l-.77-5h13.2l-1.43 5ZM8 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m9 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"
              /></svg
            >
            {#if count > 0}
              <span
                class="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-white text-xs font-bold text-[#f54504] shadow"
              >
                {count}
              </span>
            {/if}
          </span>
        {/snippet}
      </TabbarLink>

      <TabbarLink
        href="/orders"
        active={path.startsWith("/orders")}
        label="Orders"
      >
        {#snippet icon()}
          <svg class="size-7" fill="currentColor" viewBox="0 0 24 24"
            ><path
              d="M21 11h-3V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3v-6c0-.55-.45-1-1-1M5 19c-.55 0-1-.45-1-1V5h12v13a3 3 0 0 0 .17 1zm15-1c0 .55-.45 1-1 1s-1-.45-1-1v-5h2z"
            /><path d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z" /></svg
          >
        {/snippet}
      </TabbarLink>
    </ToolbarPane>
  </Tabbar>
</App>
