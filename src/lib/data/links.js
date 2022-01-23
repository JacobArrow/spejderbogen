// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import HomeIcon from 'svelte-material-icons/Home.svelte';
import PencilIcon from 'svelte-material-icons/LeadPencil.svelte';
import PlaylistIcon from 'svelte-material-icons/PlaylistMusic.svelte';
import FormatListIcon from 'svelte-material-icons/FormatListBulletedSquare.svelte';
import InfoIcon from 'svelte-material-icons/InformationOutline.svelte';

export const NAVBAR_LINKS = [
	{ name: 'Alle sange', link: '/sange' },
	{ name: 'Kategorier', link: '/kategorier' },
	{ name: 'Forfattere', link: '/forfattere' }
];
export const DRAWER_LINKS = [
	{ name: 'Forside', link: '/', icon: HomeIcon },
	{ name: 'Alle sange', link: '/sange', icon: PlaylistIcon },
	{ name: 'Kategorier', link: '/kategorier', icon: FormatListIcon },
	{ name: 'Forfattere', link: '/forfattere', icon: PencilIcon },
	{ name: 'Om Spejderbogen', link: '/om-spejderbogen', icon: InfoIcon }
];
