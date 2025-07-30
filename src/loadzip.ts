import { unzipRaw, type ZipEntry, type ZipInfoRaw } from 'unzipit';
import { clearUi } from './clearUi';
import { getFileExtension } from './getFileExtension';
import { getMimeTypeByFilename } from './getMimeTypeByFilename';
import { clearState, setState } from './state';
import { browserHasSupportForFilePicker } from './browserHasSupportForFilePicker';
import { getFilenameAndPath } from './getFilenameAndPath';

// setOptions({workerURL: 'path/to/unzipit-worker.module.js'});

const byteNumberFormatter = Intl.NumberFormat('en', {
	notation: 'compact',
	style: 'unit',
	unit: 'byte',
	unitDisplay: 'narrow'
});

function showFilePickerError(error: Error) {
	if (error.toString().startsWith('AbortError')) return;

	document.querySelector<HTMLDivElement>('#message-zipcorruption')!.hidden =
		false;
}

async function getFile() {
	const file = await window
		.showOpenFilePicker({
			types: [
				{
					description: 'Zip',
					accept: {
						'application/zip': ['.zip']
					}
				}
			],
			excludeAcceptAllOption: true,
			multiple: false
		})
		.catch(showFilePickerError);

	return file?.at(0)?.getFile();
}

export async function loadZip(evnt: any) {
	const file = browserHasSupportForFilePicker
		? await getFile()
		: evnt.target.files?.[0];

	updateUi(file);
}

async function updateUi(zipFile: File) {
	clearUi();
	clearState();

	if (!zipFile?.name) return;

	document.querySelector('#filename')!.innerHTML = zipFile.name;

	const zip = await unzipRaw(zipFile);

	setState(zip);

	const entries = await getZipEntriesHtml(zip);

	document.querySelector('#entries')?.append(...entries);
}

async function getZipEntriesHtml(zip: ZipInfoRaw) {
	return zip.entries
		.filter(({ size }) => !!size)
		.map(({ name, size, blob }) => {
			const [filename, path] = getFilenameAndPath(name);

			const metaFilename = document.createElement('strong');
			metaFilename.textContent = filename;

			const metaPath = document.createElement('span');
			metaPath.textContent = path;

			const metaName = document.createElement('span');
			metaName.append(metaPath, metaFilename);

			const metaSize = document.createElement('small');
			metaSize.textContent = byteNumberFormatter.format(size);

			const text = document.createElement('span');
			text.classList.add('name');
			text.append(metaName, metaSize);

			const button = document.createElement('button');
			button.textContent = '💾 save';
			button.addEventListener('click', () => save(name, blob));

			const row = document.createElement('label');
			row.setAttribute('for', name);
			row.append(text, button);
			row.dataset.mimetype = getMimeTypeByFilename(name);
			return row;
		});
}

async function save(name: string, zipEntryBlob: ZipEntry['blob']) {
	const mimetype = getMimeTypeByFilename(name);
	const [filename] = getFilenameAndPath(name);

	const newHandle = await window.showSaveFilePicker({
		suggestedName: filename,
		types: [
			{
				accept: { [mimetype]: [getFileExtension(name)] }
			}
		]
	});
	const writableStream = await newHandle.createWritable();

	const blob = await zipEntryBlob(mimetype);
	await writableStream.write(blob);
	await writableStream.close();
}
