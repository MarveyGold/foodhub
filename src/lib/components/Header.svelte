<script lang="ts">
  import { Menu } from "@boxicons/svelte";

  import {
    Dropdown,
    DropdownItem,
    DropdownDivider,
    DropdownHeader,
    DropdownGroup,
  } from "flowbite-svelte";
  import { page } from "$app/state";
  let { mode } = $props();
  let data = page.data;
  let active = $derived(page.url.pathname.slice(1));
</script>

<header class="backdrop-blur-sm bg-black-0">
  <a href="/">
    <div class="header-left">
      <button class="icon-btn" aria-label="Go back">
        <span class="material-symbols-outlined primary-icon"
          ><img
            src="/images/logo.png"
            alt="Hadeva Bakes"
            width="50"
            height="50"
          /></span
        >
      </button>
      <h1 class="brand">Hadeva Bakes</h1>
    </div>
  </a>
  <div class="header-right">
    <span class=" icon-btn">
      <div>
        <div class="flex md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#0a0a0a"
            viewBox="0 0 24 24"
          >
            <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
            <path
              d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"
            ></path>
          </svg>
        </div>
        <div class="hidden md:flex">
          <Menu />
        </div>
      </div>
      <Dropdown class="w-40" simple>
        {#if data.user}
          <DropdownHeader>
            <span class="block text-sm text-grey-755">{data.user.name}</span>
            <span class="block truncate text-sm font-medium"
              >{data.user.username}</span
            >
          </DropdownHeader>
        {:else}
          <DropdownHeader>
            <a href="/login">Sign In</a>
          </DropdownHeader>
        {/if}
        <hr />
        {#if data.user?.role === "manager"}
          {#if mode === "app"}
            <DropdownItem class="md:hidden flex" href="/manage"
              >Admin Mode</DropdownItem
            >
          {:else if mode === "admin"}
            <DropdownItem class="md:hidden flex" href="/menu"
              >Customer Mode</DropdownItem
            >
          {/if}
        {/if}
        <DropdownGroup
          class="hidden z-50 md:flex flex-col w-full items-center justify-around border-t border-white/5 bg-background px-6 py-3 backdrop-blur-3xl"
        >
          <DropdownItem
            href="/menu"
            class={active == "menu"
              ? "flex  items-center text-amber-500"
              : "flex items-center text-stone-500"}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 9H8V2H6v7H4V2H2v8c0 1.65 1.35 3 3 3h1v9h2v-9h1c1.65 0 3-1.35 3-3V2h-2zm8-7c-2.4 0-4 3.76-4 6.25 0 2.21 1.28 4.05 3 4.58V22h2v-9.17c1.72-.53 3-2.37 3-4.58C22 5.76 20.4 2 18 2"
                />
              </svg>
            </span>
            <span class="mt-1 text-[10px] uppercase tracking-tighter">Menu</span
            >
          </DropdownItem>

         

          <DropdownItem
            href="/orders"
            class={active == "orders"
              ? "flex  items-center text-amber-500"
              : "flex  items-center text-stone-500"}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 11h-3V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13c0 1.65 1.35 3 3 3h14c1.65 0 3-1.35 3-3v-6c0-.55-.45-1-1-1M5 19c-.55 0-1-.45-1-1V5h12v13a3 3 0 0 0 .17 1zm15-1c0 .55-.45 1-1 1s-1-.45-1-1v-5h2z"
                />
                <path d="M6 7h8v2H6zm0 4h8v2H6zm5 4h3v2h-3z" />
              </svg>
            </span>
            <span class="mt-1 text-[10px] uppercase tracking-tighter"
              >Order</span
            >
          </DropdownItem>
          {#if data.user?.role === "manager" && mode === "app"}
            <DropdownItem
              href="/manage"
              class={active == "manage"
                ? "hidden md:flex  items-center text-amber-500"
                : "hidden md:flex  items-center text-stone-500"}
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
              <span class="mt-1 text-[10px] tracking-tighter uppercase"
                >Manage</span
              >
            </DropdownItem>
          {/if}
        </DropdownGroup>
      </Dropdown>
    </span> <a            aria-label="cart"
            href="/cart"
            class={active == "cart"
              ? "hidden md:flex  items-center text-amber-500"
              : "hidden md:flex items-center text-stone-500"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              fill="currentColor"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                class:text-amber-500={active == "cart"}
                class:text-stone-950={active !== "cart"}
                d="M21 4H6.17l-.18-1.15A1 1 0 0 0 5 2H2v2h2.14l1.87 12.15A1 1 0 0 0 7 17h12v-2H7.86l-.31-2H19c.45 0 .84-.3.96-.73l2-7A1 1 0 0 0 21 3.99Zm-2.75 7H7.24l-.77-5h13.2l-1.43 5ZM8 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m9 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"
              />
            </svg>
                      </a>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }
  .header-right {
    width: 10vw;
  }
  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .brand {
    font-family: var(--font-brand);
    font-size: 24px;
    font-weight: 700;
    color: var(--color-primary);
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: var(--radius-full);
    display: flex;
    transition: background 0.15s;
    color: var(--color-on-surface-variant);
  }

  .icon-btn:hover {
    background: color-mix(
      in srgb,
      var(--color-surface-variant) 40%,
      transparent
    );
  }

  .primary-icon {
    color: var(--color-primary);
  }
</style>
