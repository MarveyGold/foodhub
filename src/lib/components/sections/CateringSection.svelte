<script>
	const contacts = [
		{
			name: 'WhatsApp',
			handle: '+234805 025 7305',
			href: 'https://wa.me/2348050257305',
			icon: 'whatsapp'
		},
		{
			name: 'Instagram',
			handle: '@hadevabakes',
			href: 'https://instagram.com/hadevabakes',
			icon: 'instagram'
		},
		{
			name: 'Facebook',
			handle: 'Hadeva Bakes',
			href: 'https://www.facebook.com/profile.php?id=61584115490305',
			icon: 'facebook'
		}
	];
</script>
<section id="contact" class="bg-stone-900/30 py-24">
  <div class="mx-auto max-w-5xl px-6 text-center">
    <div class="mb-12 grid gap-8 md:grid-cols-3">
      <div
        class="rounded-3xl border border-white/5 bg-stone-950/50 p-8 transition-all hover:bg-[#C41E3A]/5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <!-- Handle arc -->
          <path
            d="M13 18 Q13 8 20 8 Q27 8 27 18"
            stroke="#F5A623"
            stroke-width="1.8"
            stroke-linecap="round"
            fill="none"
          />
          <!-- Basket body -->
          <rect
            x="8"
            y="18"
            width="24"
            height="14"
            rx="3"
            stroke="#F5A623"
            stroke-width="1.8"
            fill="none"
          />
          <!-- Basket vertical lines -->
          <line
            x1="16"
            y1="18"
            x2="16"
            y2="32"
            stroke="#F5A623"
            stroke-width="1.4"
          />
          <line
            x1="20"
            y1="18"
            x2="20"
            y2="32"
            stroke="#F5A623"
            stroke-width="1.4"
          />
          <line
            x1="24"
            y1="18"
            x2="24"
            y2="32"
            stroke="#F5A623"
            stroke-width="1.4"
          />
        </svg>
        <h4
          class="mb-2 text-2xl font-bold text-white"
          style="font-family: 'Plus Jakarta Sans', sans-serif;"
        >
          Quick Pickup
        </h4>
        <p class="text-xs leading-relaxed text-stone-500">
          Order online and pick up your favourites
        </p>
      </div>

      <div
        class="rounded-3xl border border-white/5 bg-stone-950/50 p-8 transition-all hover:bg-[#C41E3A]/5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <!-- Box body -->
          <rect
            x="6"
            y="16"
            width="22"
            height="16"
            rx="2"
            stroke="#F5A623"
            stroke-width="1.8"
            fill="none"
          />
          <!-- Box lid -->
          <path
            d="M4 16 L28 16 L25 10 L7 10 Z"
            stroke="#F5A623"
            stroke-width="1.8"
            stroke-linejoin="round"
            fill="none"
          />
          <!-- Lid center line -->
          <line
            x1="16"
            y1="10"
            x2="16"
            y2="16"
            stroke="#F5A623"
            stroke-width="1.8"
          />
          <!-- Flash bolt -->
          <path
            d="M34 8 L27 19 L31 19 L30 28 L37 17 L33 17 Z"
            stroke="#F5A623"
            stroke-width="1.6"
            stroke-linejoin="round"
            fill="none"
          />
        </svg>
        <h4
          class="mb-2 text-2xl font-bold text-white"
          style="font-family: 'Plus Jakarta Sans', sans-serif;"
        >
          Fast Delivery
        </h4>
        <p class="text-xs leading-relaxed text-stone-500">Recieve your order</p>
      </div>

      <div
        class="rounded-3xl border border-white/5 bg-stone-950/50 p-8 transition-all hover:bg-[#C41E3A]/5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <!-- Calendar body -->
          <rect
            x="7"
            y="10"
            width="26"
            height="22"
            rx="3"
            stroke="#F5A623"
            stroke-width="1.8"
            fill="none"
          />
          <!-- Header bar -->
          <line
            x1="7"
            y1="17"
            x2="33"
            y2="17"
            stroke="#F5A623"
            stroke-width="1.8"
          />
          <!-- Tab pegs -->
          <line
            x1="14"
            y1="7"
            x2="14"
            y2="13"
            stroke="#F5A623"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="26"
            y1="7"
            x2="26"
            y2="13"
            stroke="#F5A623"
            stroke-width="2"
            stroke-linecap="round"
          />
          <!-- Grid dots -->
          <circle cx="14" cy="22" r="1.2" fill="#F5A623" />
          <circle cx="20" cy="22" r="1.2" fill="#F5A623" />
          <circle cx="26" cy="22" r="1.2" fill="#F5A623" />
          <circle cx="14" cy="27" r="1.2" fill="#F5A623" />
          <circle cx="20" cy="27" r="1.2" fill="#F5A623" />
        </svg>

        <h4
          class="mb-2 text-2xl font-bold text-white"
          style="font-family: 'Plus Jakarta Sans', sans-serif;"
        >
          Custom Pre-orders
        </h4>
        <p class="text-xs leading-relaxed text-stone-500">
          Want it fresh out of the oven? Preorder now
        </p>
      </div>
    </div>
  </div>
</section>
<section id="contact-us" class="bg-stone-900/30 py-24">
	<div class="mx-auto max-w-5xl px-6 text-center">
		<h3
			class="mb-2 text-3xl font-bold text-white"
			style="font-family: 'Plus Jakarta Sans', sans-serif;"
		>
			Get in Touch
		</h3>
		<p class="mb-12 text-sm text-stone-500">Reach out to us on any platform</p>

		<div class="grid gap-8 md:grid-cols-3">
			{#each contacts as contact}
				<a
					href={contact.href}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-3xl border border-white/5 bg-stone-950/50 p-8 text-left transition-all hover:bg-[#C41E3A]/5"
				>
					<div
						class="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
						style="background: rgba(245, 166, 35, 0.1);"
					>
						{#if contact.icon === 'whatsapp'}
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#F5A623"
								stroke-width="1.6"
							>
								<path
									d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.9 7.9 0 0 0-6.84 11.85L4 20l4.27-1.12a7.93 7.93 0 0 0 3.78.96h.01a7.9 7.9 0 0 0 7.9-7.9 7.85 7.85 0 0 0-2.36-5.62z"
								/>
							</svg>
						{:else if contact.icon === 'instagram'}
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#F5A623"
								stroke-width="1.6"
							>
								<rect x="3" y="3" width="18" height="18" rx="5" />
								<circle cx="12" cy="12" r="4" />
								<circle cx="17.5" cy="6.5" r="0.5" fill="#F5A623" />
							</svg>
						{:else if contact.icon === 'facebook'}
							<svg
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#F5A623"
								stroke-width="1.6"
							>
								<path
									d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
								/>
							</svg>
						{/if}
					</div>
					<h4
						class="mb-1 text-xl font-bold text-white"
						style="font-family: 'Plus Jakarta Sans', sans-serif;"
					>
						{contact.name}
					</h4>
					<p class="text-xs leading-relaxed text-stone-500">{contact.handle}</p>
				</a>
			{/each}
		</div>
	</div>
</section>
