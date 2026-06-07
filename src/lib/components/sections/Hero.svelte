<script>
  import { goto } from "$app/navigation";
  let current = $state(0);
  const slides = [
    "/background1.png",
    "/background2.png",
    "/background3.png",
    "/background4.png",
  ];
  $effect(() => {
    const interval = setInterval(() => {
      current = (current + 1) % 5;
    }, 4000);
    return () => clearInterval(interval);
  });
</script>

<!-- src/lib/components/sections/Hero.svelte -->
<header
  id="home"
  class="relative flex min-h-screen items-center overflow-hidden pt-20"
>
  <div class="absolute inset-0 z-0">
    <img
      alt="Smoky Jollof Rice"
      class="h-full w-full scale-105 object-cover opacity-60"
      src={slides[current]}
    />
    <div
      class="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent"
    ></div>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl px-6">
    <div class="grid items-center gap-12 md:grid-cols-2">
      <div class="space-y-8">
        <h1
          class="text-5xl leading-tight font-extrabold text-white md:text-7xl"
          style="font-family: 'Plus Jakarta Sans', sans-serif;"
        >
          <span class="text-[#f54504]">Relishly Yours</span>
        </h1>
        <p
          class="max-w-lg text-lg leading-relaxed text-white/70"
          style="font-family: 'Be Vietnam Pro', sans-serif;"
        >
          From soft, delicious cakes to irresistable snacks and refreshing
          drinks, Hadeva Bakes brings joy to every bite. Made fresh with love
          just for you
        </p>
        <div class="flex gap-4 pt-4">
          <button
            onclick={() => goto("/cart")}
            class="transform rounded-xl bg-[#f54504] px-6 py-4 text-lg font-bold text-white shadow-xl shadow-[#f54504]/20 transition-all hover:bg-[#9e0027] active:scale-95"
          >
            Order Now
          </button>
          <button
            onclick={() => goto("/menu")}
            class="transform rounded-xl border-2 border-amber-500 bg-transparent px-6 py-4 text-lg font-bold text-amber-500 transition-all hover:bg-amber-500/10 active:scale-95"
          >
            View Menu
          </button>
        </div>
      </div>

      <div class="hidden md:block">
        <div class="group relative">
          <div
            class="absolute -inset-4 rounded-[2rem] bg-[#f54504]/20 blur-2xl transition-all duration-500 group-hover:bg-amber-500/20"
          ></div>
        </div>
      </div>
    </div>
  </div>
</header>
