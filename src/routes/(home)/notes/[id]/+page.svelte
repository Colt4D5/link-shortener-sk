<script>
  export let data;
  const link = data.link;
</script>

<h1>Login Details for {link.title}</h1>
<p><strong>URL:</strong> {link.website}</p>
<p><strong>Username/Email:</strong> {link.username}</p>
<p><strong>Password:</strong> {link.password}</p>
{#if link.passwordHint }
  <p><strong>Password Hint:</strong> {link.passwordHint}</p>
{/if}
{#if link.comments }
  <p><strong>Comments:</strong> {link.comments}</p>
{/if}