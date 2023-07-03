<script>
	import { invalidateAll } from '$app/navigation';
  import toast from 'svelte-french-toast';
  import EditModal from './EditModal.svelte';
  export let data;
  const { user, link } = data;

  let isEditing = false;

  let field;
  let fieldValue;

  const editField = async (e) => {
    field = e.target.dataset.field;
    fieldValue = e.target.dataset.fieldValue;

    isEditing = true;
  }

  const closeDialog = () => {
    isEditing = false;
    invalidateAll();
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast('Successfully Copied Text!', {
      icon: '📋'
    })
  }
</script>

<h1><small>Login Details for:</small><br>{link.title}</h1>

<div id="deets">
  <div class="left">
    <div class="row">
      <strong>URL:</strong>
      <span><a href={link.url} target="_blank">{link.url}</a></span>
      <div class="controls">
        <button tabindex="-1" on:keypress={() => copyToClipboard(link.url)} on:click={() => copyToClipboard(link.url)}>Copy</button>
        <button data-field="url" data-field-value={link.url} on:click={editField}>Edit</button>
      </div>
    </div>
    
    <div class="row">
      <strong>Username/Email:</strong>
      <span>{link.username}</span>
      <div class="controls">
        <button tabindex="-1" on:keypress={() => copyToClipboard(link.username)} on:click={() => copyToClipboard(link.username)}>Copy</button>
        <button data-field="username" data-field-value={link.username} on:click={editField}>Edit</button>
      </div>
    </div>
    
    <div class="row">
      <strong>Password:</strong>
      <span>{link.password}</span>
      <div class="controls">
        <button tabindex="-1" on:keypress={() => copyToClipboard(link.password)} on:click={() => copyToClipboard(link.password)}>Copy</button>
        <button data-field="password" data-field-value={link.password} on:click={editField}>Edit</button>
      </div>
    </div>
    
    {#if link.passwordHint }
      <div class="row">
        <strong>Password Hint:</strong>
        <span>{link.passwordHint}</span>
        <div class="controls">
          <button tabindex="-1" on:keypress={() => copyToClipboard(link.passwordHint)} on:click={() => copyToClipboard(link.passwordHint)}>Copy</button>
          <button data-field="passwordHint" data-field-value={link.passwordHint} on:click={editField}>Edit</button>
        </div>
      </div>
    {/if}
    
    {#if link.comments }
      <div class="row">
        <strong>Comments:</strong> 
        {link.comments}
        <div class="controls">
          <button tabindex="-1" on:keypress={() => copyToClipboard(link.comments)} on:click={() => copyToClipboard(link.comments)}>Copy</button>
          <button data-field="comments" data-field-value={link.comments} on:click={editField}>Edit</button>
        </div>
      </div>  
    {/if}
  </div>

  <div class="right">
    <div class="qr-code">
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${link.url}`} alt={link.title} />
    </div>
  </div>
</div>

{#if isEditing }
  <EditModal {user} id={link.id} field={field} fieldValue={fieldValue} {closeDialog} />
{/if}

<style lang="postcss">
  #deets {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    @media (min-width: 40em) {
      flex-direction: row;
    }
    & .left {
      flex: 1;
      & .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: #ffffff0a;
        &:not(:last-of-type) {
          margin-bottom: 0.5rem;
        }
        & .controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.25rem;
          & button {
            max-width: 100px;
            margin: 0;
          }
        }
      }
    }
    & .right {
      & .qr-code {
        min-width: calc(200px + 2rem);
        min-height: calc(200px + 2rem);
        padding: 1rem;
        background-color: #ffffff0a;
        border-radius: 0.5rem;
      }
    }
  }
</style>
