<script>
  import '@picocss/pico';
  import "$src/app.postcss";
  import Header from '$components/Header.svelte';
</script>

<Header />
<main>
  <div class="container">
    <slot></slot>
  </div>
</main>