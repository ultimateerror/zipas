import type { ZipEntry, ZipInfoRaw } from 'unzipit';
import { getMimeTypeByFilename } from './getMimeTypeByFilename';

let _zipEntries: ZipEntry[] | undefined = undefined;

export function clearState() {
	_zipEntries = undefined;
}

export function getImageZipEntries() {
	return _zipEntries?.filter(x =>
		getMimeTypeByFilename(x.name).startsWith('image/')
	);
}

export function setState(zip: ZipInfoRaw) {
	_zipEntries = zip.entries;
}
