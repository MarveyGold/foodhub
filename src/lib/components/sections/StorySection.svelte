<!-- src/lib/components/sections/StorySection.svelte -->
<section id="story" class="relative overflow-hidden bg-stone-950 py-24">
  <div
    class="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
  ></div>

  <div class="mx-auto max-w-7xl px-6">
    <div class="grid items-center gap-16 md:grid-cols-2">
      <div class="order-2 md:order-1">
        <div class="relative inline-block">
          <div
            class="absolute -top-4 -left-4 h-24 w-24 border-t-2 border-l-2 border-[#f54504]"
          ></div>
          <div
            class="absolute -right-4 -bottom-4 h-24 w-24 border-r-2 border-b-2 border-amber-500"
          ></div>
          <img
            alt="Chef Fejiro"
            class="relative z-10 aspect-square w-full rounded-2xl object-cover shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
            src="/chef.png"
          />
        </div>
      </div>

      <div class="order-1 space-y-6 md:order-2">
        <h2
          class="text-3xl font-bold text-[#f54504]"
          style="font-family: 'Plus Jakarta Sans', sans-serif;"
        >
          The Heart Behind The Bakes
        </h2>
        <p class="text-lg leading-relaxed text-white/90 italic">
          "Relishly yours "
        </p>
        <p class="text-base leading-relaxed text-stone-400">
          Hadeva Bakes is a passionate bakery dedicated to creating delightful
          cakes, tasty snacks, and refreshing drinks for every occasion. We
          believe every bite should feel special, which is why everything we
          make is freshly prepared with quality ingredients and a touch of love.
        </p>
        <p class="text-base leading-relaxed text-stone-400">
          Whether you’re celebrating a birthday, hosting an event, or simply
          treating yourself, we’re here to make your moments sweeter. Relishly
          yours always.
        </p>
        <div class="flex gap-8 pt-4">
          <div>
            <div class="text-3xl font-bold text-white">X</div>
            <div class="text-xs tracking-widest text-amber-500 uppercase">
              Years Experience
            </div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white">X</div>
            <div class="text-xs tracking-widest text-amber-500 uppercase">
              Happy Guests
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
