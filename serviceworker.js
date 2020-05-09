const version = '0';

addEventListener('install', e => {
  e.waitUntil(caches.open(version).then(cache => cache.addAll([
    '.',
    "./manifest.webmanifest",
    "./icon.png",
    './style.css',
    './dist/handlebars.js',
    './dist/app.min.js',
    './dist/fonts/roboto-v20-latin-regular.woff2',
    './dist/fonts/danielbd.woff2',
    './dist/fonts/fonts.css',
    './dist/icons.svg',
    'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.runtime.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.21.0/system.js',
  ]).then(() => {
    console.log("install finished")
  })));
});

addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

addEventListener('message', messageEvent => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
});

addEventListener('activate', activateEvent => {
  activateEvent.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map(key => {
      if (key !== version) {
        return caches.delete(key);
      }
    })))
  );
});