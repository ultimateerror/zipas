import { getFilenameAndPath } from './getFilenameAndPath';
import { getMimeTypeByFilename } from './getMimeTypeByFilename';
import { getImageZipEntries } from './state';

async function downloadBlob(name: string, blob: Blob) {
	const [filename] = getFilenameAndPath(name);

	const a = document.createElement('a');
	document.body.append(a);
	a.hidden = true;

	const url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = filename;
	a.click();
	window.URL.revokeObjectURL(url);
}

export async function unzipAndSaveAll() {
	getImageZipEntries()?.forEach(async x =>
		downloadBlob(x.name, await x.blob(getMimeTypeByFilename(x.name)))
	);
}
