/* REPROGEN CAMPO PWA - service worker corrigido
   Cache app-shell offline-first para GitHub Pages em subpasta.
*/
var CACHE = 'reprogen-campo-pwa-v1-20260530';
var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(key) {
        if (key !== CACHE) {
          return caches.delete(key);
        }
      }));
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') { return; }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) { return cached; }

      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200) { return response; }

        try {
          var copy = response.clone();
          caches.open(CACHE).then(function(cache) {
            cache.put(event.request, copy);
          });
        } catch (err) {}

        return response;
      }).catch(function() {
        if (event.request.mode === 'navigate' ||
            (event.request.headers.get('accept') || '').indexOf('text/html') !== -1) {
          return caches.match('./index.html');
        }
        return new Response('', {
          status: 504,
          statusText: 'Offline'
        });
      });
    })
  );
});
