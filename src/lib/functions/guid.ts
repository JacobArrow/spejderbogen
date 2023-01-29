import { v4 as uuidv4 } from 'uuid';
const storageName = 'localGuid';

export function getLocalGuid(): string | null {
	return localStorage.getItem(storageName);
}

export function generateLocalGuid(): void {
	if (!getLocalGuid()) {
		localStorage.setItem(storageName, uuidv4());
	}
}
