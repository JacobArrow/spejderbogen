<script>
	import supabase from '$data/db.js';
	let json = '';

	async function createSongs() {
		const { data: categories, error } = await supabase.from('categories').select();
		const songs = JSON.parse(json);
		if (error) throw new Error(error.message);
		for (const song of songs) {
			var category = categories.filter((obj) => {
				return obj.name === song.categori;
			});
			const { data: result, error } = await supabase.from('songs').insert([
				{
					number: song.number,
					name: song.name,
					text: song.text,
					categori_id: category[0].id,
					melody: song.melody
				}
			]);
			console.log(result);
		}
	}

	async function createAuthors() {
		const authors = JSON.parse(json);

		for (let i = 0; i < authors.length; i++) {
			const { data: result, error } = await supabase.from('authors').insert([
				{
					id: i + 1,
					name: authors[i]
				}
			]);
			console.log(result);
		}
	}

	async function createAuthorsRelation() {
		const songs = JSON.parse(json);

		for (const song of songs) {
			const authors = song.author.split(',');
			for (let i = 0; i < authors.length; i++) {
				const cleanedAuthor = authors[i].trim();
				const { data: author } = await supabase
					.from('authors')
					.select()
					.filter('name', 'in', '(' + cleanedAuthor + ')');
				const { data: songRow } = await supabase.from('songs').select().eq('number', song.number);
				if (songRow.length && author.length) {
					console.log(`song ${songRow[0].id} with author ${author[0].id}`);
					const { data: result, error } = await supabase.from('song_author').insert([
						{
							song_id: songRow[0].id,
							author_id: author[0].id
						}
					]);
				}
			}
		}
	}

	async function getData() {
		let { data, error } = await supabase.from('songs').select(`
          id, name,
          authors (id, name)
      `);
		console.log(data);
		if (error) console.log('error', error);
		return data;
	}
</script>

{#await getData()}
	<p>Fetching data...</p>
{:then data}
	{#each data as row}<p>
			{row.name} - {row.authors[0]?.name} - {row.id} - {row.authors[0]?.id}
		</p>{/each}
{:catch error}
	<pre>{error}</pre>
{/await}

<textarea bind:value={json} />
<button class="btn" on:click={() => createSongs()}>create songs</button>
<button class="btn" on:click={() => createAuthors()}>create authors</button>
<button class="btn" on:click={() => createAuthorsRelation()}>create author relation</button>
