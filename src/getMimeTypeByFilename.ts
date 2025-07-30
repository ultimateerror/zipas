import { getFileExtension } from './getFileExtension';

export function getMimeTypeByFilename(filename: string) {
	const extension = getFileExtension(filename);

	switch (extension) {
		case '.apng':
		case '.avif':
		case '.bmp':
		case '.gif':
		case '.heic':
		case '.heif':
		case '.jpeg':
		case '.png':
		case '.raw':
		case '.tif':
		case '.tiff':
		case '.webp':
			return `image/${extension.replace('.', '')}`;

		case '.jfif':
		case '.jpg':
			return 'image/jpeg';

		case '.svg':
		case '.svgz':
			return 'image/svg+xml';
	}

	return 'application/octet-stream';
}
