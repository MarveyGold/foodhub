<script>
  import { enhance } from "$app/forms";
  let name = $state("");
  let category = $state("");
  let price = $state("");
  let description = $state("");
  let available = $state(true);
  let preview = $state("");
  let hasPreview = $state(false);
  let activeNav = $state("menu");

  // --- Handlers ---
  function handleUploadClick() {
    hasPreview = false;
  }
  function handleImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    hasPreview = true;
    preview = URL.createObjectURL(file);
  }
  function handleSubmit() {
    console.log({
      name,
      category,
      price,
      description,
      available,
      preview,
    });
  }

  function handleCancel() {
    history.back();
  }
</script>

<!-- MAIN CONTENT -->
<main>
  <div class="section-header">
    <h2>Add New Menu Item</h2>
  </div>

  <form
    onsubmit={handleSubmit}
    method="POST"
    enctype="multipart/form-data"
    use:enhance
  >
    <!-- Dish Photo -->
    <div class="field-group">
      <label class="field-label"
        >Photo <div
          class="upload-zone"
          class:has-preview={hasPreview}
          aria-label="Upload dish photo"
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            onchange={handleImage}
          />
          {#if hasPreview}
            <img src={preview} alt="Dish preview" class="preview-img" />
          {:else}
            <div class="upload-placeholder">
              <span class="material-symbols-outlined upload-icon"
                >add_a_photo</span
              >
              <p class="upload-label">Tap to upload dish photo</p>
              <p class="upload-caption">High-res JPG or PNG preferred</p>
            </div>
          {/if}
        </div></label
      >
    </div>

    <!-- Dish Name -->
    <div class="field-group">
      <label class="field-label" for="dish-name">Name</label>
      <input
        id="dish-name"
        class="field-input"
        name="name"
        type="text"
        bind:value={name}
      />
    </div>

    <!-- Category & Price -->
    <div class="grid-2">
      <div class="field-group">
        <label class="field-label" for="category">Category</label>
        <div class="select-wrap">
          <select id="category" class="field-input" name="category">
            <option value="" disabled selected>Select</option>
            <option value="cake">Cakes</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
          </select>
          <span class="material-symbols-outlined select-arrow"
            >keyboard_arrow_down</span
          >
        </div>
      </div>

      <div class="field-group">
        <label class="field-label" for="price">Price (₦)</label>
        <input
          id="price"
          class="field-input"
          type="number"
          name="price"
          placeholder="0.00"
          bind:value={price}
        />
      </div>
    </div>
    <div class="grid-2">
      <div class="field-group">
        <label for="size" class="field-label">Inches</label>
        <input type="number" name="size" class="field-input" />
      </div>
      <div class="field-group">
        <label for="layers" class="field-label">Layers</label>
        <input type="number" name="layers" class="field-input" />
      </div>
    </div>

    <!-- Description -->
    <div class="field-group">
      <label class="field-label" for="description">Description</label>
      <textarea
        id="description"
        class="field-input"
        rows="3"
        placeholder="Describe the flavors, ingredients, and soul of this dish..."
        bind:value={description}
      ></textarea>
    </div>

    <!-- Availability Toggle -->
    <div class="toggle-row">
      <div class="toggle-text">
        <span class="toggle-title">Item Availability</span>
        <span class="toggle-caption">Visible to customers immediately</span>
      </div>
      <div class="toggle-track" class:active={available}>
        <input
          name="stock"
          id="toggle"
          type="checkbox"
          class="toggle-input"
          bind:checked={available}
        />
        <label
          for="toggle"
          class="toggle-thumb"
          aria-label="Toggle availability"
        ></label>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="actions">
      <button type="submit" class="btn-primary">
        <span class="material-symbols-outlined">save</span>
        Save to Menu
      </button>
      <button type="button" class="btn-outline" onclick={handleCancel}>
        Cancel
      </button>
    </div>
  </form>
</main>

<style>
  /* Design Tokens */
  :global(:root) {
    --font-brand: "Plus Jakarta Sans", sans-serif;
    --font-body: "Be Vietnam Pro", sans-serif;

    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-full: 9999px;

    --spacing-xs: 4px;
    --spacing-sm: 12px;
    --spacing-md: 24px;
    --spacing-lg: 48px;
    --spacing-gutter: 20px;
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Header */
  /* Main */
  main {
    max-width: 480px;
    margin: 0 auto;
    padding: var(--spacing-md) var(--spacing-gutter) 120px;
  }

  .section-header {
    margin-bottom: var(--spacing-lg);
  }

  .section-header h2 {
    font-family: var(--font-brand);
    font-size: 32px;
    font-weight: 700;
    margin-bottom: var(--spacing-xs);
  }

  .section-header p {
    font-size: 16px;
    color: var(--color-on-surface-variant);
  }

  /* Form */
  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .field-label {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--color-on-surface-variant);
  }

  .field-input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-lg);
    background: var(--color-surface-container-low);
    color: black;
    border: 1px solid var(--color-outline-variant);
    font-family: var(--font-body);
    font-size: 16px;
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    appearance: none;
  }

  .field-input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 1px var(--color-primary);
  }

  textarea.field-input {
    resize: none;
  }

  /* Photo Upload */
  .upload-zone {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-xl);
    border: 2px dashed var(--color-outline-variant);
    background: var(--color-surface-container-low);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: border-color 0.2s;
  }

  .upload-zone:hover {
    border-color: var(--color-primary);
  }

  .upload-zone.has-preview {
    border-style: solid;
    border-color: var(--color-primary);
  }

  .preview-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .upload-icon {
    font-size: 36px;
    color: var(--color-outline);
    transition: color 0.2s;
  }

  .upload-zone:hover .upload-icon {
    color: var(--color-primary);
  }

  .upload-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-on-surface-variant);
  }

  .upload-caption {
    font-size: 12px;
    color: var(--color-outline);
  }

  /* Select */
  .select-wrap {
    position: relative;
  }

  .select-wrap select {
    padding-right: 48px;
  }

  .select-arrow {
    position: absolute;
    right: var(--spacing-md);
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: var(--color-outline);
    font-size: 20px;
  }

  /* 2-col grid */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
  }

  /* Toggle */
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md);
    border-radius: var(--radius-xl);
    background: var(--color-surface-container-high);
    border: 1px solid
      color-mix(in srgb, var(--color-outline-variant) 30%, transparent);
  }

  .toggle-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .toggle-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-on-surface);
  }

  .toggle-caption {
    font-size: 12px;
    color: var(--color-on-surface-variant);
  }

  .toggle-track {
    position: relative;
    width: 48px;
    height: 24px;
    flex-shrink: 0;
  }

  .toggle-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-thumb {
    display: block;
    width: 48px;
    height: 24px;
    border-radius: var(--radius-full);
    background: var(--color-surface-variant);
    cursor: pointer;
    transition: background 0.3s;
    position: relative;
  }

  .toggle-thumb::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: var(--radius-full);
    background: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
  }

  .toggle-track.active .toggle-thumb {
    background: var(--color-primary);
  }

  .toggle-track.active .toggle-thumb::after {
    transform: translateX(24px);
  }

  /* Buttons */
  .actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding-top: var(--spacing-md);
  }

  .btn-primary {
    width: 100%;
    background: var(--color-primary);
    color: var(--color-on-primary);
    border: none;
    border-radius: var(--radius-full);
    padding: var(--spacing-md) 0;
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    box-shadow: 0 4px 12px rgba(158, 0, 39, 0.3);
    transition:
      filter 0.15s,
      transform 0.1s;
  }

  .btn-primary:hover {
    filter: brightness(1.1);
  }
  .btn-primary:active {
    transform: scale(0.98);
  }

  .btn-outline {
    width: 100%;
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    border-radius: var(--radius-full);
    padding: var(--spacing-md) 0;
    font-family: var(--font-body);
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.15s,
      transform 0.1s;
  }

  .btn-outline:hover {
    background: color-mix(in srgb, var(--color-primary) 5%, transparent);
  }

  .btn-outline:active {
    transform: scale(0.98);
  }

  /* Bottom Nav */
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: var(--color-surface);
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 var(--spacing-gutter);
    z-index: 50;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-on-surface-variant);
    transition: color 0.2s;
    padding: 8px 12px;
    border-radius: var(--radius-lg);
  }

  .nav-item.active {
    color: var(--color-primary);
    font-weight: 700;
  }

  .nav-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
</style>
