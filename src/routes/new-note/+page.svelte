<script>
  import { invalidateAll, goto } from '$app/navigation';
  import toast from 'svelte-french-toast';
  export let data;

  let title;
  let url;
  let username;
  let password;
  let passwordHint;
  let comments;

  async function handleSubmit() {

    const formData = { user: data.user, title, url, username, password, passwordHint, comments }

    const res = await fetch('/api/links/create-new', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (res.status === 200) {
      await invalidateAll();
      toast.success('Successfully saved a note!')
      setTimeout(() => {
        goto('/');
      }, 1000);
    } else {
      toast.error('Whoopsie! something went wrong.')
    }

  }
</script>

<div class="container">
  <h2>Create New Note</h2>
  <form on:submit|preventDefault={handleSubmit} method="POST"  >
    <input type="text" name="title" id="title" placeholder="Note Title*" required bind:value={title}>
    <input type="text" name="url" id="url" placeholder="Website*" required  bind:value={url}>
    <div class="grid">
      <input type="text" name="username" id="username" placeholder="Username/Email*" required  bind:value={username}>
      <input type="password" name="password" id="password" placeholder="Password*" required  bind:value={password}>
    </div>
    <input type="text" name="passwordhint" id="passwordhint" placeholder="Password Hint"  bind:value={passwordHint}>
    <textarea name="comments" id="comments" cols="30" rows="4" placeholder="Notes/Comments"  bind:value={comments}></textarea>
    <button type='submit'>Submit</button>
  </form>
</div>
