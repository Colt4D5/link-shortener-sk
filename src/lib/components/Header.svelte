<script>
	import { invalidateAll } from '$app/navigation';
  export let isLoggedIn;
  import toast from 'svelte-french-toast';

  const logOut = async () => {
    try {
      document.cookie = 'Username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      toast.success('Successfully logged out');
      invalidateAll();
    } catch (error) {
      toast.error('Oops, something went wrong...');
    }
  }
</script>

<header>
  <div class="container">
    <nav>
      <ul>
        <li>
          <h1>Pas<span class="color__svelte">SV</span>ord</h1>
        </li>
      </ul>
      {#if isLoggedIn }
        <ul>
          <li><a href="/">My Passwords</a></li>
          <li><a href="/new-note">+Password</a></li>
          <li><button on:click={logOut}>Log Out</button></li>
        </ul>
      {/if}
    </nav>
  </div>
</header>