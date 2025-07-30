export function clearUi() {
	document.querySelector('#entries')!.innerHTML = '';
	document.querySelector<HTMLDivElement>('#message-zipcorruption')!.hidden =
		true;
}
