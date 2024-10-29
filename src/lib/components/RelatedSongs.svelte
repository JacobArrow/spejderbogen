<script>
  import CardGrid from './CardGrid.svelte';
  import SongCard from './SongCard.svelte';
  import { liveQuery } from 'dexie';
  import { db } from '$data/db';

  export let categoryId;

  $: relatedSongs = liveQuery(async () => {
    return await db.songs.where('categori_id').equals(categoryId).toArray();
  });
</script>

{#if $relatedSongs.length}
  <CardGrid>
    {#each $relatedSongs as song (song.id)}
      <SongCard {song} />
    {/each}
  </CardGrid>
{:else}
  <p>Ingen relaterede sange fundet.</p>
{/if}
