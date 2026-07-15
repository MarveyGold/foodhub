<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import type { PageData, ActionData } from "./$types";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  const ROLES = ["admin", "manager", "staff", "customer"];

  let name = $state(data.user.name);
  let role = $state(data.user.role);

  let saving = $state(false);
  let deleting = $state(false);
  let confirmingDelete = $state(false);
</script>

<div class="p-6 max-w-lg mx-auto">
  <a href="/users" class="text-sm text-gray-500 hover:underline"
    >&larr; Back to users</a
  >

  <h1 class="text-xl font-semibold mt-2 mb-6">{data.user.name}</h1>

  {#if form?.error}
    <p class="text-red-600 text-sm mb-4">{form.error}</p>
  {/if}
  {#if form?.success}
    <p class="text-green-600 text-sm mb-4">Saved.</p>
  {/if}

  <div class="space-y-2 text-sm text-gray-600 mb-6">
    <p>
      <span class="text-gray-400">Phone Number:</span>
      {data.user.username ?? "—"}
    </p>
    <p><span class="text-gray-400">Email:</span> {data.user.email}</p>
    <p>
      <span class="text-gray-400">Joined:</span>
      {new Date(data.user.createdAt).toLocaleDateString()}
    </p>
  </div>

  <!-- Update name -->
  <form
    method="POST"
    action="?/updateUser"
    class="mb-6"
    use:enhance={() => {
      saving = true;
      return async ({ update }) => {
        await update();
        saving = false;
      };
    }}
  >
    <input type="hidden" name="userId" value={data.user.id} />
    <label class="block text-sm font-medium mb-1" for="name">Name</label>
    <input
      id="name"
      name="name"
      type="text"
      bind:value={name}
      class="border rounded px-3 py-2 w-full mb-3"
    />
    <button
      type="submit"
      disabled={saving}
      class="px-4 py-2 rounded bg-black text-white text-sm disabled:opacity-50"
    >
      {saving ? "Saving…" : "Save name"}
    </button>
  </form>

  <!-- Role -->
  <form method="POST" action="?/setRole" class="mb-6" use:enhance>
    <input type="hidden" name="userId" value={data.user.id} />
    <label class="block text-sm font-medium mb-1" for="role">Role</label>
    <div class="flex gap-2">
      <select
        id="role"
        name="role"
        bind:value={role}
        class="border rounded px-3 py-2 flex-1"
      >
        {#each ROLES as r}
          <option value={r}>{r}</option>
        {/each}
      </select>
      <button
        type="submit"
        class="px-4 py-2 rounded bg-black text-white text-sm"
      >
        Update role
      </button>
    </div>
  </form>

  <!-- Delete -->
  <div class="border-t pt-6">
    {#if !confirmingDelete}
      <button
        type="button"
        onclick={() => (confirmingDelete = true)}
        class="text-red-600 text-sm hover:underline"
      >
        Delete user
      </button>
    {:else}
      <form
        method="POST"
        action="?/deleteUser"
        use:enhance={() => {
          deleting = true;
          return async ({ result }) => {
            if (result.type === "success") {
              await goto("/admin/users");
            } else {
              deleting = false;
            }
          };
        }}
      >
        <input type="hidden" name="userId" value={data.user.id} />
        <p class="text-sm text-gray-600 mb-2">
          This permanently deletes {data.user.name}. This can't be undone.
        </p>
        <div class="flex gap-2">
          <button
            type="submit"
            disabled={deleting}
            class="px-4 py-2 rounded bg-red-600 text-white text-sm disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Confirm delete"}
          </button>
          <button
            type="button"
            onclick={() => (confirmingDelete = false)}
            class="px-4 py-2 rounded border text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    {/if}
  </div>
</div>
