<script>
  import "../../app.css";
  import Header from "$lib/components/Header.svelte";
  import MobileNav from "$lib/components/MobileNav.svelte";
  import { page } from "$app/state";
  import { preloadData } from "$app/navigation";

  let { children } = $props();

  let active = $derived(page.url.pathname.slice(1));

  $effect(() => {
    if (typeof window === "undefined") return;

    if (active !== "menu") preloadData("/menu");
    if (active !== "orders") preloadData("/orders");
  });
</script>

<Header mode="app" />
{@render children()}
<MobileNav />
