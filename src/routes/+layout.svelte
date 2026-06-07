<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";


  let { children } = $props();
</script>

<main>
  {@render children()}
</main>


