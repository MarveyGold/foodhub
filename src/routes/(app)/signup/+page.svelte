<script lang="ts">
  import type { ActionData } from "./$types";
  let { form }: { form: ActionData } = $props();
</script>

<form method="POST">
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  <input
    name="name"
    placeholder="Full name"
    value={form?.name ?? ""}
    required
  />
  <input
    name="email"
    type="email"
    placeholder="Email"
    value={form?.email ?? ""}
    required
  />
  <input
    name="phone"
    type="tel"
    autocomplete="username"
    placeholder="Phone Number"
    value={form?.phone ?? ""}
    required
  />
  <input
    name="password"
    type="password"
    placeholder="Password"
    minlength="8"
    required
  />
  <button>Sign up</button>
</form>
