<script>
  import { enhance } from '$app/forms';
  let { data } = $props();
</script>

{#each data.menu as product}
  <p>{product.name}</p>

  <form method="POST" action="?/delete" use:enhance>
    <input type="hidden" name="_id" value={product._id} />
    <button type="submit">Delete</button>
  </form>
{/each}