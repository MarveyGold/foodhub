<script>
  function handleCancel() {
    history.back();
  }
</script>

<header class="backdrop-blur-sm bg-black-0">
  <div class="header-left">
    <button class="icon-btn" aria-label="Go back" onclick={handleCancel}>
      <span class="material-symbols-outlined primary-icon"
        ><img src="/logo.png" alt="Hadeva Bakes" width="50" height="50" /></span
      >
    </button>
    <h1 class="brand">Hadeva Bakes</h1>
  </div>
  <div class="header-right">
    <span class=" icon-btn"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
        <path
          d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"
        ></path>
      </svg></span
    >
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }

  .header-left,
  .header-right {
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
