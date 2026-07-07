<script>
  import "../../app.css";

  import MobileNav from "$lib/components/MobileNav.svelte";
  import Header from "$lib/components/Header.svelte";

  let { children } = $props();
</script>

<main class="light">
  <Header mode="app" />

  {@render children()}

  <MobileNav />
</main>
