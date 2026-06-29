<script>
  import "../../app.css";

  import MobileNav from "$lib/components/MobileNav.svelte";
  import Header from "$lib/components/Header.svelte";

  let { children } = $props();
</script>

<main class="light">
  <Header />

  {@render children()}

  <MobileNav />
</main>

<style>
  .dark {
    --color-background: #0a0a0a;
    --color-on-background: #f0f0f0;
    --color-primary: #f6d055;
  }
  .light {
    --color-primary: #f54504;
    --color-background: #fafafa;
    --color-on-background: #1d1b18;
  }
</style>
