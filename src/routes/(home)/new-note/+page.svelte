<script>
  import { invalidateAll, goto } from '$app/navigation';
  import { applyAction, deserialize } from '$app/forms';
  // export let form;

  let title;
  let website;
  let username;
  let password;
  let passwordHint;
  let comments;

  async function handleSubmit() {

    const formData = { title, website, username, password, passwordHint, comments }

    const res = await fetch('/api/links/create-new', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    const resData = await res.json();
    
    if (res.type === 'success') {
      await invalidateAll();
    }

    applyAction(res);
  }
</script>

<div class="container">
  <h2>Create New Note</h2>
  <!-- {#if form?.success}
  <p>You have successfully saved a new note!</p>
  {/if} 
  {#if form?.fail}
    <p>Oops! Something has gone wrong...</p>
  {/if}  -->
  <!-- <form action="?/createNote" method="POST"  > -->
  <form on:submit|preventDefault={handleSubmit} method="POST"  >
    <input type="text" name="title" id="title" placeholder="Note Title*" required bind:value={title}>
    <input type="text" name="website" id="website" placeholder="Website*" required  bind:value={website}>
    <div class="grid">
      <input type="text" name="username" id="username" placeholder="Username/Email*" required  bind:value={username}>
      <input type="password" name="password" id="password" placeholder="Password*" required  bind:value={password}>
    </div>
    <input type="text" name="passwordhint" id="passwordhint" placeholder="Password Hint"  bind:value={passwordHint}>
    <textarea name="comments" id="comments" cols="30" rows="10" placeholder="Notes/Comments"  bind:value={comments}></textarea>
    <button type='submit'>Submit</button>
  </form>
</div>
