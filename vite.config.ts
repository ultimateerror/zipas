import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import packageJson from './package.json' with { type: 'json' };

export default defineConfig({
	base: '',
	plugins: [
		VitePWA({ registerType: 'autoUpdate' }),
		{
			name: 'html-transform',
			transformIndexHtml(html) {
				return html.replace(
					'</head>',
					`<meta name="version" content="${packageJson.version}">
					<meta name="build-date" content="${new Date().toISOString()}">
					</head>`
				);
			}
		}
	]
});
