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
    './dist/handlebars.runtime.min.js',
    './dist/FileSaver.min.js',
    './dist/system.js',
  ]).then(() => {
    console.log("install finished")
  })));
});

// https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68
addEventListener('fetch', event => {
  event.respondWith((async () => {
    if (event.request.mode === "navigate" &&
      event.request.method === "GET" &&
      registration.waiting &&
      (await clients.matchAll()).length < 2
    ) {
      registration.waiting.postMessage('skipWaiting');
      return new Response("", {headers: {"Refresh": "0"}});
    }
    return await caches.match(event.request) ||
      fetch(event.request);
  })());
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