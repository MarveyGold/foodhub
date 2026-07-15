<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData, ActionData } from "./$types";

  let { data, form }: { data: PageData; form: ActionData } = $props();

  // prefer the action result (after a search submit) over the load data
  let users = $derived(form?.users ?? data.users);
  let total = $derived(form?.total ?? data.total);
  let searchValue = $state(data.search ?? "");

  let roleFilter = $state("");
  let searching = $state(false);
</script>

<div class="p-6 max-w-5xl mx-auto">
  <h1 class="text-xl font-semibold mb-4">Users</h1>

  <form
    method="POST"
    action="?/searchUser"
    class="flex gap-2 mb-4"
    use:enhance={() => {
      searching = true;
      return async ({ update }) => {
        await update();
        searching = false;
      };
    }}
  >
    <input
      type="text"
      name="q"
      bind:value={searchValue}
      placeholder="Search by username"
      class="border rounded px-3 py-2 flex-1"
    />
    <button
      type="submit"
      disabled={searching}
      class="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
    >
      {searching ? "Searching…" : "Search"}
    </button>
  </form>

  <p class="text-sm text-gray-500 mb-2">{total} user{total === 1 ? "" : "s"}</p>

  <table class="w-full border-collapse text-sm">
    <thead>
      <tr class="text-left border-b">
        <th class="py-2 pr-4">Username</th>
        <th class="py-2 pr-4">Name</th>
        <th class="py-2 pr-4">Role</th>
        <th class="py-2 pr-4">Created</th>
        <th class="py-2 pr-4"></th>
      </tr>
    </thead>
    <tbody>
      {#each users as user (user.id)}
        <tr class="border-b hover:bg-gray-50">
          <td class="py-2 pr-4">{user.username ?? "—"}</td>
          <td class="py-2 pr-4">{user.name}</td>
          <td class="py-2 pr-4">
            <span class="px-2 py-0.5 rounded bg-gray-100 text-xs">{user.role}</span>
          </td>
          <td class="py-2 pr-4">{new Date(user.createdAt).toLocaleDateString()}</td>
          <td class="py-2 pr-4">
            <a href={`/users/${user.username}`} class="text-blue-600 hover:underline">Edit</a>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="5" class="py-6 text-center text-gray-400">No users found</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
