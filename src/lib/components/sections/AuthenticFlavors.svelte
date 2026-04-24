<script>
	const menuItems = $state([
		{
			name: 'Egusi Elegance',
			price: '₦18,500',
			description:
				'Melon seeds slow-cooked with organic spinach, assorted premium meats, and smoked catfish.',
			image:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuDlRamcK7jSH6QTWhbBRYt-m08BNFoNbd1WPmWwqBAKPjQoD935sBhOI97Zd6KqWsVPuse--pOEwihiEd4GJ42aE2PNUmq_TQbomm4TDX9Gfyb0VSPID3oVSSXWrSh2dzfgPGy9dToW0ahKW6LZIbqod0ryEGTOrpp1JLsit53fPD3w_seSWIR3orqcJ5rKsDhLk8Hvp62kdkMOgxN-bf63XU1rqTwv3g2Bf82FsOvaljjwV54yv5EKhVACfrOvaKKAj0IdNoMhvmhd',
			tags: ['Signature', 'Spicy']
		},
		{
			name: 'Wagyu Suya',
			price: '₦24,000',
			description:
				'Thinly sliced Wagyu beef crusted in artisanal Yaji spice, flame-grilled and served with onion foam.',
			image:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuDbcnBMoZQ7ZotAvdhpliJlLn3zOOiax9yVOUMV8EUHe09LBTJvbPikRs8X8WMKCCTboRZsiXefjAMGLcF-kDeDPYPgEyw_1r2mAU1nu7byYW-UzDvpBtjkEtgm67BOUqpUgJHPL8yCRmOy0X_O5sDG5Iax2Qbm0-9VWeCYX4_LhzW0LBUXXxWfEi2LyUZnnYVgdGaCLxzYys06cSZ_YIQuaWBt6vnOL2M1em02QlwmsTQUsY8Seo_CZ_aPfyPLIeJasxRqXv7LZpgU',
			tags: ["Chef's Choice"]
		},
		{
			name: 'Plantain Gnocchi',
			price: '₦12,000',
			description:
				'Sweet plantain pillows tossed in a spicy Ata Din Din reduction with herb oil and goat cheese.',
			image:
				'https://lh3.googleusercontent.com/aida-public/AB6AXuD7YMkLkd4yxprm6t2dC0h-WRRvRwKmGdhwXZ-7VUzvFgk1VsKxP2MED-zbqEO2rukux-eiaXpQ-HBre5GSnQmZOYasFxSNofaYUbnpmVNSsLTELRatFoJ824kzIAwp2NHBbuYF7Y4WzVNh2T-vp8qYYaQpkA81wrwaAopeeC_iSyu5MK3M3Vl0NNpa_sRtjRZLQKT13RU2ygRfY7egBKr5rhHBfe8EmugauTIv7Rl73NePTojtI492nDhh1BySY4kiIkGmEMWuf-jZ',
			tags: ['Vegetarian']
		}
	]);
</script>

<section class="px-margin py-xl">
	<div class="mb-xl flex items-end justify-between">
		<div>
			<h2 class="font-headline-lg text-headline-lg mb-xs">Authentic Flavors</h2>
			<p class="text-on-surface-variant">The soul of Nigeria on every plate</p>
		</div>
		<div class="flex gap-2">
			<span
				class="border-secondary-container text-label-sm text-secondary-container rounded-full border px-4 py-1"
			>
				Vegan Options
			</span>
			<span
				class="border-secondary-container text-label-sm text-secondary-container rounded-full border px-4 py-1"
			>
				Gluten-Free
			</span>
		</div>
	</div>

	<div class="gap-lg grid grid-cols-1 md:grid-cols-3">
		{#each menuItems as item}
			<div class="glass-card group hover:bg-surface-container rounded-xl p-4 transition-all">
				<div class="mb-md aspect-video overflow-hidden rounded-lg">
					<img
						src={item.image}
						alt={item.name}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
				</div>
				<div class="mb-2 flex items-start justify-between">
					<h4 class="font-headline-md text-headline-md">{item.name}</h4>
					<span class="font-headline-md text-secondary-container">{item.price}</span>
				</div>
				<p class="mb-md text-body-md text-on-surface-variant">{item.description}</p>
				<div class="flex gap-2">
					{#each item.tags as tag}
						<span
							class="bg-primary/10 text-primary rounded px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
						>
							{tag}
						</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>
