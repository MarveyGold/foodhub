<script>
  import { onMount } from "svelte";

  let active = $state("home");
  let menuOpen = $state(false);

  const sections = ["home", "menu", "story", "contact"];

  function scrollToSection(id) {
    active = id;
    menuOpen = false;

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  }

  // Scroll spy
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            active = entry.target.id;
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });
</script>

<nav
  class="fixed top-0 z-50 w-full border-b border-white/10 bg-stone-950/90 shadow-xl backdrop-blur-md h-[10dvh]"
>
  <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
    <div class="header-left">
      <button class="icon-btn" aria-label="Go back">
        <span class="material-symbols-outlined primary-icon"
          ><img
            src="/logo.png"
            alt="Hadeva Bakes"
            width="50"
            height="50"
          /></span
        >
      </button>
      <h1 class="brand">Hadeva Bakes</h1>
    </div>

    <div class="hidden items-center space-x-8 md:flex">
      {#each sections as section}
        <button
          onclick={() => scrollToSection(section)}
          class={active == section
            ? " border-amber-500  text-amber-500 pb-1 text-sm font-bold tracking-wide font-jakarta border-b-2 "
            : "pb-1 text-sm font-bold font-jakarta border-b-2 tracking-wide"}
          >{section.charAt(0).toUpperCase() + section.slice(1)}</button
        >
      {/each}
    </div>

    <div class="flex items-center space-x-6">
      <button
        class="material-symbols-outlined text-white transition-all duration-300 hover:text-amber-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
          <path
            d="M21 4H6.17l-.18-1.15A1 1 0 0 0 5 2H2v2h2.14l1.87 12.15A1 1 0 0 0 7 17h12v-2H7.86l-.31-2H19c.45 0 .84-.3.96-.73l2-7A1 1 0 0 0 21 3.99Zm-2.75 7H7.24l-.77-5h13.2l-1.43 5ZM8 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m9 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</nav>

<style>
  .header-left {
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
    align-items: center;
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
