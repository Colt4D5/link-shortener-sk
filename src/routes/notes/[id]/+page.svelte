<script>
	import { invalidateAll, goto } from '$app/navigation';
  import toast from 'svelte-french-toast';
  import EditModal from './EditModal.svelte';
  import trashBinIcon from '$lib/assets/trash-bin.svg?raw';
  import openIcon from '$lib/assets/open.svg?raw';
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
    toast('Text copied!', {
      icon: '📋'
    })
  }

  const deleteNote = async () => {
    const res = await fetch('/api/links/delete-one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user, id: link.id })
    })
    const json = await res.json();
    
    if (json.status === 202) {
      toast.success('Successfully deleted!')
      invalidateAll();
      setTimeout(() => {
        goto('/');
      }, 1000);
    }
  }
</script>

<h1><small>Login Details for:</small><br>{link.title}</h1>

<div id="deets">
  <div class="left">
    <div class="row">
      <div class="flex">
        <strong>URL:</strong>
        <div class="controls">
          <button tabindex="-1" on:keypress={() => copyToClipboard(link.url)} on:click={() => copyToClipboard(link.url)}>✄</button>
          <button data-field="url" data-field-value={link.url} on:click={editField}>✎</button>
        </div>
      </div>
      <div class="content">
        <span><a href={link.url} target="_blank">{link.url}</a></span>
      </div>
    </div>
    
    <div class="row">
      <div class="flex">
        <strong>Username/Email:</strong>

        <div class="controls">
          <button tabindex="-1" on:keypress={() => copyToClipboard(link.username)} on:click={() => copyToClipboard(link.username)}>✄</button>
          <button data-field="username" data-field-value={link.username} on:click={editField}>✎</button>
        </div>
      </div>
      <div class="content">
        <span>{link.username}</span>
      </div>
    </div>
    
    <div class="row">
      <div class="flex">
        <strong>Password:</strong>

        <div class="controls">
          <button tabindex="-1" on:keypress={() => copyToClipboard(link.password)} on:click={() => copyToClipboard(link.password)}>✄</button>
          <button data-field="password" data-field-value={link.password} on:click={editField}>✎</button>
        </div>
      </div>
      <div class="content">
        <span>{link.password}</span>
      </div>
    </div>
    
    {#if link.passwordHint }
      <div class="row">
        <div class="flex">
          <strong>Password Hint:</strong>

          <div class="controls">
            <button tabindex="-1" on:keypress={() => copyToClipboard(link.passwordHint)} on:click={() => copyToClipboard(link.passwordHint)}>✄</button>
            <button data-field="passwordHint" data-field-value={link.passwordHint} on:click={editField}>✎</button>
          </div>
        </div>
        <div class="content">
          <span>{link.passwordHint}</span>
        </div>
      </div>
    {/if}
    
    {#if link.comments }
      <div class="row">
        <div class="flex">
          <strong>Comments:</strong> 

          <div class="controls">
            <button tabindex="-1" on:keypress={() => copyToClipboard(link.comments)} on:click={() => copyToClipboard(link.comments)}>✄</button>
            <button data-field="comments" data-field-value={link.comments} on:click={editField}>✎</button>
          </div>
        </div>
        <div class="content">
          <span>{link.comments}</span>
        </div>
      </div>  
    {/if}
  </div>

  <div class="right">
    <div class="qr-code">
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${link.url}`} alt={link.title} />
    </div>
    <div class="buttons grid">
      <a href={link.url} target="_blank"><button>{@html openIcon}</button></a>
      <button on:click={deleteNote}>{@html trashBinIcon}</button>
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
        padding: 1rem;
        border-radius: 0.5rem;
        /* background-color: #ffffff0a; */
        box-shadow: 3px 4px 6px 2px rgb(0 0 0 / 0.15);
        & .flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid #ffffff11;
          line-height: 1;
          padding-bottom: 0.5rem;
          & .controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.25rem;
            & button {
              max-width: 100px;
              margin: 0;
              padding: 0.25rem 0.5rem;
            }
          }
        }
        & .content {
          padding-inline: 1rem;
        }
        &:not(:last-of-type) {
          margin-bottom: 0.5rem;
        }
      }
    }
    & .right {
      & .qr-code {
        min-width: calc(200px + 2rem);
        min-height: calc(200px + 2rem);
        padding: 1rem;
        /* background-color: #ffffff0a; */
        box-shadow: 3px 4px 6px 2px rgb(0 0 0 / 0.15);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
      }
      & .buttons.grid {
        & button {
          padding-block: 0.25rem;
          & svg {
            pointer-events: none;
            width: 32px;
            height: 32px;
          }
        }
      }
    }
  }
</style>
