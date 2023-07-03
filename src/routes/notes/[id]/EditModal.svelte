<script>
	import { invalidateAll, goto } from '$app/navigation';
  export let user;
  export let id;
  export let field;
  export let fieldValue;
  export let closeDialog;

  const saveEdit = async (e) => {
    console.log(fieldValue);
    const json = await fetch('/api/links/edit-one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        user, 
        id, 
        field, 
        fieldValue 
      })
    })
    const res = await json.json();
    window.location.reload();
  }
</script>

<dialog open>
  <div class="inner">
    <h2>Editing "{field}"</h2>
    <form method="dialog" on:submit={saveEdit}>
      {#if field === 'comments' }
        <textarea name={field} id={field} cols="30" rows="4" bind:value={fieldValue}></textarea>
      {:else}
        <input type="text" name={field} id={field} bind:value={fieldValue}>
      {/if}
      <button on:click={saveEdit}>Save</button>
    </form>
    <button class="close-btn" on:click={closeDialog}>&#x2715</button>
  </div>
</dialog>

<style lang="postcss">
  dialog {
    & .inner {
      position: relative;
      width: min(90%, 500px);
      background-color: var(--background-color);
      padding: 2rem 1rem;
      border-radius: 1rem;
      & .close-btn {
        position: absolute;
        display: inline-block;
        top: 0.5rem;
        right: 0.5rem;
        width: auto;
        padding: 0.25rem 0.4rem;
        border-radius: 0.5rem;
        line-height: 1;
      }
    }
  }
</style>
