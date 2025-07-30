export const browserHasSupportForFilePicker =
	!!(window as any).showOpenFilePicker &&
	typeof (window as any).showOpenFilePicker == 'function';

(function () {
	document.querySelector<HTMLElement>('#message-unsupportedbrowser')!.hidden =
		browserHasSupportForFilePicker;
})();
