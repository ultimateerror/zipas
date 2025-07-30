export function getFileExtension(filename: string): `.${string}` {
	const extension = filename.split('.').at(-1);
	return `.${extension}`;
}
