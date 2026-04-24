<!-- src/lib/components/sections/Hero.svelte -->
<header class="relative flex min-h-screen items-center overflow-hidden pt-20">
	<div class="absolute inset-0 z-0">
		<img
			alt="Smoky Jollof Rice"
			class="h-full w-full scale-105 object-cover opacity-60"
			src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoO-foH3JJ2Zj4EL9jt58xJvjBtBfpKrND2qbSUUTM7TcW2Zzq5QU5DFYDWoHsss7RqQtQuBn4C3rxkXKipdVmJua65VtlhZtJ-sTOoU057nfL0FMCgu5UBoFYOkKmg3Dc37NY-PhNOw3Y0L6IB9mU-zHdWyg61nIlThSZE4Wmfj9nkVGH27c1TWJQVgIMNSfUXa2gqG5OLdB5gaIR44TmOgV3mgslEQyHyJdojGDly0K77Je2ZXuvd5I5dOHKSbAvNyqXZ-6z2Vps"
		/>
		<div
			class="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-transparent"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-6">
		<div class="grid items-center gap-12 md:grid-cols-2">
			<div class="space-y-8">
				<div
					class="inline-flex items-center rounded-full border border-[#C41E3A]/30 bg-[#C41E3A]/20 px-4 py-1.5 text-sm font-semibold tracking-wide text-amber-500"
				>
					<span class="mr-2">🔥</span> Authentic Nigerian Flavors
				</div>
				<h1
					class="text-5xl leading-tight font-extrabold text-white md:text-7xl"
					style="font-family: 'Plus Jakarta Sans', sans-serif;"
				>
					If na food mata, <br />
					<span class="text-[#C41E3A]">your mata na our own</span>
				</h1>
				<p
					class="max-w-lg text-lg leading-relaxed text-white/70"
					style="font-family: 'Be Vietnam Pro', sans-serif;"
				>
					Experience the legendary smoky depth of our signature Jollof Rice and traditional Nigerian
					delicacies, crafted with love and community spirit.
				</p>
				<div class="flex flex-wrap gap-4 pt-4">
					<button
						class="transform rounded-xl bg-[#C41E3A] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-[#C41E3A]/20 transition-all hover:bg-[#9e0027] active:scale-95"
					>
						Join Our Table
					</button>
					<button
						class="transform rounded-xl border-2 border-amber-500 bg-transparent px-8 py-4 text-lg font-bold text-amber-500 transition-all hover:bg-amber-500/10 active:scale-95"
					>
						Save Your Spot
					</button>
				</div>
			</div>

			<div class="hidden md:block">
				<div class="group relative">
					<div
						class="absolute -inset-4 rounded-[2rem] bg-[#C41E3A]/20 blur-2xl transition-all duration-500 group-hover:bg-amber-500/20"
					></div>
				</div>
			</div>
		</div>
	</div>
</header>
