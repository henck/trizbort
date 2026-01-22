import { defineConfig, ViteDevServer } from 'vite';
import { execSync } from 'child_process';
import { watch } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import legacy from '@vitejs/plugin-legacy';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Custom plugin to regenerate SVG sprite when svg/ files change
function svgSpritePlugin() {
  const svgDir = resolve(__dirname, 'svg');

  function buildSprite() {
    try {
      execSync('node scripts/build-svg-sprite.js', { stdio: 'inherit' });
    } catch (e) {
      console.error('Failed to build SVG sprite:', e);
    }
  }

  return {
    name: 'svg-sprite',
    buildStart() {
      // Rebuild sprite at start of each build
      buildSprite();
    },
    configureServer(server: ViteDevServer) {
      // Watch svg/ directory and rebuild on changes
      const watcher = watch(svgDir, { recursive: true }, (event, filename) => {
        if (filename?.endsWith('.svg')) {
          console.log(`SVG changed: ${filename}, rebuilding sprite...`);
          buildSprite();
        }
      });

      server.httpServer?.on('close', () => watcher.close());
    },
  };
}

export default defineConfig({
  root: '.',
  base: '/app/',
  publicDir: 'public',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  plugins: [
    svgSpritePlugin(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'maps',
          dest: '.',
        },
      ],
    }),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,ico}'],
      },
      manifest: {
        name: 'Trizbort.io',
        short_name: 'Trizbort',
        start_url: '.',
        display: 'standalone',
        theme_color: '#353537',
        background_color: '#353537',
        icons: [
          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
