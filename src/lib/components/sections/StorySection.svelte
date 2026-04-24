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
						class="absolute -top-4 -left-4 h-24 w-24 border-t-2 border-l-2 border-[#C41E3A]"
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
					class="text-3xl font-bold text-[#C41E3A]"
					style="font-family: 'Plus Jakarta Sans', sans-serif;"
				>
					The Heart Behind The Heat
				</h2>
				<p class="text-lg leading-relaxed text-white/90 italic">
					"If na food mata, your mata na our own."
				</p>
				<p class="text-base leading-relaxed text-stone-400">
					Fejiro Food Hub started in a small home kitchen with a big dream: to bring the authentic,
					unapologetic taste of Nigerian celebrations to every home. Chef Fejiro believes that food
					isn't just fuel—it's memory, culture, and connection.
				</p>
				<p class="text-base leading-relaxed text-stone-400">
					Today, we remain a community food hub, where every pot of Jollof is stirred with the same
					passion as the very first one. We don't just cater; we celebrate with you.
				</p>
				<div class="flex gap-8 pt-4">
					<div>
						<div class="text-3xl font-bold text-white">X</div>
						<div class="text-xs tracking-widest text-amber-500 uppercase">Years Experience</div>
					</div>
					<div>
						<div class="text-3xl font-bold text-white">X</div>
						<div class="text-xs tracking-widest text-amber-500 uppercase">Happy Guests</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
