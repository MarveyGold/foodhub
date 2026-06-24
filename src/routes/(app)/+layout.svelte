<script>
  import "../../app.css";

  import MobileNav from "$lib/components/MobileNav.svelte";
  import Header from "$lib/components/Header.svelte";

  let { children } = $props();
</script>

<Header />
<main class="light">
  {@render children()}
</main>

<MobileNav />

<style>
  .dark {
    --color-background: #0a0a0a;
    --color-on-background: #f0f0f0;
  }
  .light {
    --color-background: #fafafa;
    --color-on-background: #1d1b18;
  }
</style>
