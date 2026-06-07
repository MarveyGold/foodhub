<script>
  import "../../app.css";

  import MobileNav from "$lib/components/MobileNav.svelte";
  import Header from "$lib/components/Header.svelte";

  let { children } = $props();
</script>

<Header />
<main>
  {@render children()}
</main>

<MobileNav />
