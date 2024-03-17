import path from 'node:path';
import { createRequire } from 'node:module';

import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps')
);

export default defineConfig({
  plugins: [
   viteStaticCopy({
     targets: [
       {
         src: cMapsDir,
         dest: '',
       },
     ],
   }),
  ],
  ...(process.env.NODE_ENV === 'development'
    ? {
      define: {
        global: {},
      },
    }
    : {}),
  resolve: {
    alias: {
      ...(process.env.NODE_ENV !== 'development'
        ? {
          './runtimeConfig': './runtimeConfig.browser', //fix production build
        }
        : {}),
    },
  },
});
