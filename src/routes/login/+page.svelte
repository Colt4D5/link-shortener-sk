<script>
  import { setCookie } from '$lib/utils';
  import { invalidateAll, goto } from '$app/navigation';
  import toast from 'svelte-french-toast';

  let username;
  let password;

  const handleLogin = async (e) => {
    if (!username || !password) {
      toast.error('You must fill out both fields');
      return;
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    const formData = await res.json();
    
    if (formData.status === 200) {
      setCookie('loggedIn', 'true', 30);
      setCookie('Username', formData.username, 30);
      toast.success('Welcome back!')
      invalidateAll();
      goto('/');
    } else if (formData.status === 404) {
      toast.error('Your login credentials are incorrect');
    } else {
      toast.error('Whoops! Something went wrong.')
    }
  }
</script>


<form on:submit|preventDefault={handleLogin} method="post">
  <h1>Log In</h1>
  <input type="text" name="username" id="username" placeholder="Username" bind:value={username}>
  <input type="password" name="password" id="password" placeholder="Password" bind:value={password}>
  <input type="submit" value="Log In">
</form>

<style lang="postcss">
  form {
    width: min(600px, 100%);
    margin-inline: auto;
    padding: 2rem 1rem;
    background-color: #ffffff06;
    border-radius: 0.5rem;
  }
</style>
