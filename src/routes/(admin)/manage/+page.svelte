<svelte:head>
  <title>Admin | Hadeva Bakes</title>
</svelte:head>
<main class="p-4 pb-24 max-w-lg mx-auto">
  <h2 class="text-2xl font-bold text-(--color-on-background) mb-2">Admin Panel</h2>
  <p class="text-on-background text-sm mb-6">Manage Hadeva Bakes</p>

  <div class="flex flex-col gap-3">
    <a
      href="/add-menu"
      class="flex items-center gap-4 rounded-2xl border border-surface-container bg-surface p-4 active:bg-stone-800 transition"
    >
      <div
        class="h-10 w-10 rounded-full bg-[#f54504]/10 flex items-center justify-center text-[#f54504]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
        </svg>
      </div>
      <div>
        <h3 class="font-bold text-primary">Add Product</h3>
        <p class="text-xs text-surface-tint">Add a new item to the menu</p>
      </div>
    </a>

    <a
      href="/delete"
      class="flex items-center gap-4 rounded-2xl border border-surface-container bg-surface p-4 active:bg-stone-800 transition"
    >
      <div
        class="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm0 5h2v9H9V8zm4 0h2v9h-2V8z"
          />
        </svg>
      </div>
      <div>
        <h3 class="font-bold text-primary">Manage Menu</h3>
        <p class="text-xs text-surface-tint">Delete existing items</p>
      </div>
    </a>

    <a
      href="/orders"
      class="flex items-center gap-4 rounded-2xl border border-surface-container bg-surface p-4 active:bg-stone-800 transition"
    >
      <div
        class="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.31 14H9.72L5.95 2.68A1 1 0 0 0 5 2H2v2h2.28l3.54 10.63A2 2 0 0 0 9.72 16h7.59a2 2 0 0 0 1.87-1.3l2.76-7.35-1.87-.7zM10 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"
          />
        </svg>
      </div>
      <div>
        <h3 class="font-bold text-primary">Orders</h3>
        <p class="text-xs text-surface-tint">View incoming orders</p>
      </div>
    </a><a
      href="/menu/api"
      class="flex items-center gap-4 rounded-2xl border border-surface-container bg-surface p-4 active:bg-stone-800 transition"
    >
      <div
        class="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.31 14H9.72L5.95 2.68A1 1 0 0 0 5 2H2v2h2.28l3.54 10.63A2 2 0 0 0 9.72 16h7.59a2 2 0 0 0 1.87-1.3l2.76-7.35-1.87-.7zM10 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 1 0 0-4"
          />
        </svg>
      </div>
      <div>
        <h3 class="font-bold text-primary">Menu Backup</h3>
        <p class="text-xs text-surface-tint">Get a local backup of the menu</p>
      </div>
    </a>

  </div>
</main>
