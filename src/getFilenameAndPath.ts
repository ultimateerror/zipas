export function getFilenameAndPath(filename: string) {
	const [filenameOnly, ...path] = filename.split('/').reverse();

	return [filenameOnly, `${path.reverse().join('/')}${path.length ? '/' : ''}`];
}
