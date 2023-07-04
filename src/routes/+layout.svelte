<script>
	import { Toaster } from 'svelte-french-toast';
  export let data;

  import '@picocss/pico';
  import "$src/app.postcss";

  import Header from '$components/Header.svelte';

</script>

<Toaster />

<Header isLoggedIn={data.loggedIn} />
<main>
  <div class="container">
    <slot></slot>
  </div>
</main>

<style lang="postcss">
  main {
    padding-block: 4rem;
  }
</style>
