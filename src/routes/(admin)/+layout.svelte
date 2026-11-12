<script>
  import "../../app.css";
  import {
    App, Page, Navbar, Tabbar, TabbarLink, ToolbarPane, Link, Popover, List, ListItem,
  } from "konsta/svelte";
  import { page, navigating } from "$app/state";

  let { children } = $props();

  // follows the pending navigation so the highlight moves once, at tap time
  const path = $derived(navigating.to?.url.pathname ?? page.url.pathname);
  const isOrders = $derived(path.startsWith("/manage/orders"));
  const isManage = $derived(path.startsWith("/manage") && !isOrders);
  const isAdd = $derived(path.startsWith("/add-menu"));
  const isDelete = $derived(path.startsWith("/delete"));

  const user = $derived(page.data.user);

  let popoverOpened = $state(false);
  let popoverTarget = $state(null);
  const openPopover = (target) => {
    popoverTarget = target;
    popoverOpened = true;
  };
  const closePopover = () => (popoverOpened = false);

  const navClass = (active) =>
    `px-3 py-2 text-sm font-semibold uppercase tracking-tight ${active ? "text-amber-500" : "text-stone-500"}`;
</script>

<App theme="ios" safeAreas>
  <Page class="pb-safe-24 md:pb-6!">
    <Navbar>
      {#snippet left()}
        <a href="/manage" class="flex items-center gap-2">
          <img src="/images/logo.png" alt="Hadeva Bakes logo" class="size-8 object-contain" />
          <span class="text-lg font-extrabold tracking-tight text-primary">Hadeva Bakes</span>
        </a>
      {/snippet}

      {#snippet right()}
        <!-- desktop nav (the tabbar is hidden at md and up) -->
        <nav class="hidden items-center md:flex">
          <a href="/manage" class={navClass(isManage)}>Manage</a>
          <a href="/add-menu" class={navClass(isAdd)}>Add</a>
          <a href="/delete" class={navClass(isDelete)}>Menu</a>
          <a href="/manage/orders" class={navClass(isOrders)}>Orders</a>
        </nav>

        <Link iconOnly class="account-link" aria-label="Account" onClick={() => openPopover(".account-link")}>
          <svg class="size-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5" />
          </svg>
        </Link>
      {/snippet}
    </Navbar>

    <div class="mx-auto w-full max-w-screen-xl">
      {@render children()}
    </div>
  </Page>

  <Popover opened={popoverOpened} target={popoverTarget} onBackdropClick={closePopover}>
    <List nested>
      {#if user}
        <ListItem title={user.name} subtitle={user.username} />
      {/if}
      <ListItem link title="Customer View" href="/menu" onClick={closePopover} />
    </List>
  </Popover>

  <!-- mobile only -->
  <Tabbar labels icons class="fixed bottom-0 left-0 z-50 md:hidden">
    <ToolbarPane>
      <TabbarLink href="/manage" active={isManage} label="Manage">
        {#snippet icon()}
          <svg class="size-7" fill="currentColor" viewBox="0 0 24 24"><path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm0 8h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm0-18v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1z" /></svg>
        {/snippet}
      </TabbarLink>

      <TabbarLink href="/add-menu" active={isAdd} label="Add">
        {#snippet icon()}
          <svg class="size-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" /></svg>
        {/snippet}
      </TabbarLink>

      <TabbarLink href="/delete" active={isDelete} label="Menu">
        {#snippet icon()}
          <svg class="size-7" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z" /></svg>
        {/snippet}
      </TabbarLink>

      <TabbarLink href="/manage/orders" active={isOrders} label="Orders">
        {#snippet icon()}
          <svg class="size-7" fill="currentColor" viewBox="0 0 24 24"><path d="M21 11h-3V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3v-6c0-.55-.45-1-1-1M5 19c-.55 0-1-.45-1-1V5h12v13a3 3 0 0 0 .17 1zm15-1c0 .55-.45 1-1 1s-1-.45-1-1v-5h2z" /><path d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z" /></svg>
        {/snippet}
      </TabbarLink>
    </ToolbarPane>
  </Tabbar>
</App>
