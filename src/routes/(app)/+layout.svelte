<script>
  import "../../app.css";

  import MobileNav from "$lib/components/MobileNav.svelte";
  import Header from "$lib/components/Header.svelte";

  let { children } = $props();
</script>

<Header mode="app" />
{@render children()}
<MobileNav />
