<!-- src/lib/components/MobileNav.svelte -->
<nav
	class="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/5 bg-stone-950 px-6 py-3 md:hidden"
>
	<button class="flex flex-col items-center text-amber-500">
		<span class="material-symbols-outlined">restaurant_menu</span>
		<span class="mt-1 text-[10px] tracking-tighter uppercase">Menu</span>
	</button>
	<button class="flex flex-col items-center text-stone-500">
		<span class="material-symbols-outlined">receipt_long</span>
		<span class="mt-1 text-[10px] tracking-tighter uppercase">Orders</span>
	</button>
	<button
		class="relative -mt-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-950 bg-[#C41E3A] shadow-2xl shadow-[#C41E3A]/40"
	>
		<span class="material-symbols-outlined scale-110 text-white">shopping_cart</span>
	</button>
	<button class="flex flex-col items-center text-stone-500">
		<span class="material-symbols-outlined">person</span>
		<span class="mt-1 text-[10px] tracking-tighter uppercase">Profile</span>
	</button>
	<button class="flex flex-col items-center text-stone-500">
		<span class="material-symbols-outlined">more_horiz</span>
		<span class="mt-1 text-[10px] tracking-tighter uppercase">More</span>
	</button>
</nav>
