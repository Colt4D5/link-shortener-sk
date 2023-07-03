<script>
  import toast from 'svelte-french-toast';
  export let data;
  const link = data.link;

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.textContent);
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
      <a href={link.url}>{link.url}</a>
      <button>Edit</button>
    </div>
    
    <div class="row">
      <strong>Username/Email:</strong>
      <span on:click={copyToClipboard}>{link.username}</span>
      <button>Edit</button>
    </div>
    
    <div class="row">
      <strong>Password:</strong>
      <span on:click={copyToClipboard}>{link.password}</span>
      <button>Edit</button>
    </div>
    
    {#if link.passwordHint }
      <div class="row">
        <strong>Password Hint:</strong> {link.passwordHint}
      </div>
    {/if}
      
    {#if link.comments }
      <div class="row">
        <strong>Comments:</strong> {link.comments}
      </div>  
    {/if}
  </div>

  <div class="right">
    <div class="qr-code">
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${link.url}`} alt={link.title} />
    </div>
  </div>
</div>

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
        & button {
          max-width: 100px;
          margin: 0;
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
