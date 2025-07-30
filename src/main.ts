import { clearUi } from './clearUi';
import { loadZip } from './loadzip';
import { unzipAndSaveAll } from './unzipAndSaveAll';

document.querySelector('#loadzip')?.addEventListener('click', loadZip);
document.querySelector('#unloadzip')?.addEventListener('click', clearUi);
document.querySelector('#saveall')?.addEventListener('click', unzipAndSaveAll);
