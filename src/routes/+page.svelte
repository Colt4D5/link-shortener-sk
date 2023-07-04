<script>
  import { browser } from '$app/environment';
  export let data;

  $: isIsolated = undefined;

  const onIsolate = (e) => {
    const id = e.target.dataset.id;
    if (e.target.checked) {
      document.querySelectorAll('.note .isolation input[type="checkbox"]').forEach(box => {
        if (box.dataset.id !== id) {
          box.checked = false;
        }
      });
      isIsolated = id;
    } else {
      isIsolated = undefined;
    }

  }
</script>

  {#if data.notes.length > 0 }
  
    <div id="notes" class:isIsolating={isIsolated !== undefined}>
      {#each data.notes as note, i (note.id) }
        <div class="note" data-id={note.id} class:isIsolated={isIsolated === note.id}>
          <div class="isolation">
            <input data-id={note.id} type="checkbox" name="isolated" id="isolated-{note.id}" on:change={onIsolate}>
            <label for="isolated-{note.id}">Isolate</label>
          </div>
          <div class="qr-code">
            {#if browser }
              <a href={`/notes/${note.id}`}>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${window.location.origin}/notes/${note.id}`} alt={note.title} />
              </a>
            {/if}
          </div>
          <div class="note-title">
            <p>{i + 1}. {note.title}<br><span class="note-url">{note.url}</span></p>
          </div>
        </div>
      {/each}
    </div>

  {:else}
    <p>Looks like you don't have any saved logins yet...</p>
  {/if}

<style lang="postcss">
  #notes {
    display: grid;
    grid-template-columns: min(100%, 300px);
    grid-gap: 1rem;
    @media (min-width: 40em) {
      grid-template-columns: repeat(3, 33.3333%);
    }
    @media (min-width: 64em) {
      grid-template-columns: repeat(4, 25%);
    }
    &.isIsolating {
      & .note {
        opacity: 0.2;
        &.isIsolated {
          opacity: 1;
        }
        &:not(.isIsolated) {
          & .qr-code img {
            filter: brightness(0.05);
          }
        }
      }
    }
    & .note {
      background-color: #ffffff0a;
      padding: 1rem;
      border-radius: 0.5rem;
      text-align: center;
      transition: opacity 0.5s ease;
      box-shadow: 3px 4px 6px 2px rgb(0 0 0 / 0.15);
      & .isolation {
        margin-bottom: 1rem;
      }
      & .qr-code {
        cursor: pointer;
        width: 200px;
        min-height: 200px;
        margin-inline: auto;
        overflow: hidden;
        position: relative;
        & > a {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;

        }
        & img {
          transition: filter 0.5s ease;
          pointer-events: none;
        }
      }
      & .note-title {
        margin-top: 1rem;
        & p {
          display: flex;
          flex-direction: column;
        }
        & span.note-url {
          flex: 1;
          color: #666;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  #notes .note .qr-code::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    left: 0%;
    top: 0%;
    background: linear-gradient(325deg, #ffffff06, #ffffff22, #ffffff06);
    animation: loadanimation 1s ease-in-out alternate infinite;
  }
  @keyframes loadanimation {
    0% {
      top: 0%;
      left: 0%;
    }
    100% {
      top: -100%;
      left: -100%;
    }
  }
</style>
