/* REPROGEN CAMPO PWA V1.0 - service worker (app shell offline-first) */
var CACHE = 'reprogen-campo-pwa-v1';
var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if (k !== CACHE) { return caches.delete(k); }
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') { return; }
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if (hit) { return hit; }
      return fetch(e.request).then(function(res){
        try {
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        } catch (err) {}
        return res;
      }).catch(function(){
        return caches.match('./index.html');
      });
    })
  );
});
