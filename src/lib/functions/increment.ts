const songPrefix = 'song-';
const categoryPrefix = 'category-'

function getLastDate(id: number, prefix: string) {
	return localStorage.getItem(prefix + id);
}

function setLastDate(id: number, prefix: string) {
	localStorage.setItem(prefix + id, getDate());
}

function getDate() {
	return new Date().setHours(0, 0, 0, 0).toString();
}

export const incrementSong = async (songid: number) => {
    if(getLastDate(songid, songPrefix) != getDate())
	await self.fetch('/api/songs/increment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ songid: songid})
	});
	setLastDate(songid, songPrefix);
};

export const incrementCategory = async (categoryid: number) => {
    if(getLastDate(categoryid, songPrefix) != getDate())
	await self.fetch('/api/categories/increment', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ categoryid: categoryid})
	});
	setLastDate(categoryid, songPrefix);
};
