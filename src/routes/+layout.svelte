<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";


  let { children } = $props();
</script>
<svelte:head>
  <title>Hadeva Bakes</title>
  <meta name="description" content="Order fresh custom cakes, snacks and drinks from Hadeva Bakes. Fast delivery in Benin City." />
</svelte:head>
<main>
  {@render children()}
</main>


