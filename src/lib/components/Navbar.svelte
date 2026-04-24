<!-- src/lib/components/Navbar.svelte -->
<nav
	class="fixed top-0 z-50 w-full border-b border-white/10 bg-stone-950/90 shadow-xl backdrop-blur-md"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<div class="text-2xl font-black tracking-tighter text-[#C41E3A] italic">Fejiro Food Hub</div>

		<div class="hidden items-center space-x-8 md:flex">
			<a
				href="#menu"
				class="font-jakarta border-b-2 border-amber-500 pb-1 text-sm font-bold tracking-wide text-amber-500"
				>Menu</a
			>
			<a
				href="#dine-in"
				class="font-jakarta text-sm tracking-wide text-white/80 transition-colors hover:text-white"
				>Dine-in</a
			>
			<a
				href="#story"
				class="font-jakarta text-sm tracking-wide text-white/80 transition-colors hover:text-white"
				>Our Story</a
			>
			<a
				href="#contact"
				class="font-jakarta text-sm tracking-wide text-white/80 transition-colors hover:text-white"
				>Contact</a
			>
		</div>

		<div class="flex items-center space-x-6">
			<button
				class="material-symbols-outlined text-white transition-all duration-300 hover:text-amber-400"
			>
				shopping_cart
			</button>
			<button
				class="transform rounded-full bg-[#C41E3A] px-6 py-2 text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#C41E3A]/20 transition-transform duration-150 active:scale-95"
			>
				Order Now
			</button>
		</div>
	</div>
</nav>

<div class="h-20"></div>
