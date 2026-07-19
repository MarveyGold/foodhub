<script>
  import Navbar from "$lib/components/Navbar.svelte";
  import Hero from "$lib/components/sections/Hero.svelte";
  import MenuSection from "$lib/components/sections/MenuSection.svelte";
  import StorySection from "$lib/components/sections/StorySection.svelte";
  import CateringSection from "$lib/components/sections/CateringSection.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { preloadData } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    preloadData("/menu");
  });
</script>

<div class="dark">
  <Navbar />

  <Hero />
  <MenuSection />
  <StorySection />
  <CateringSection /><Footer />
</div>

<style>
  div {
    background-color: #0a0a0a;
  }
</style>
