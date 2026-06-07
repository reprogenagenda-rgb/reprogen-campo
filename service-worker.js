/* ============================================================
   REPROGEN CAMPO — Service Worker (PWA)
   Offline-first. Cacheia o app (index.html), o manifest e os icones.

   >>> IMPORTANTE A CADA DEPLOY <<<
   Suba o numero de CACHE_VERSION (ex.: 'v3', 'v4'...) sempre que
   trocar o index.html ou os icones. Sem isso, o celular pode
   continuar abrindo a versao antiga em cache.
   ============================================================ */

var CACHE_VERSION = 'v2';                 /* <-- BUMPAR A CADA DEPLOY */
var CACHE_NAME = 'reprogen-' + CACHE_VERSION;

/* Caminhos relativos ao escopo (funciona em https://usuario.github.io/repo/) */
var PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon.ico',
  './icons/icon-48x48.png',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-180x180.png',
  './icons/icon-192x192.png',
  './icons/icon-256x256.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png',
  './icons/icon-maskable-192x192.png',
  './icons/icon-maskable-512x512.png'
];

/* Instala: pre-cacheia o app shell. Tolera arquivo faltando. */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(
        PRECACHE.map(function (url) {
          return cache.add(url).catch(function () { /* ignora 1 arquivo ausente */ });
        })
      );
    }).then(function () { return self.skipWaiting(); })
  );
});

/* Ativa: remove caches antigos (reprogen-v1, etc.) */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key.indexOf('reprogen-') === 0 && key !== CACHE_NAME) {
          return caches.delete(key);
        }
        return null;
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Fetch:
   - Navegacao (abrir o app): network-first com fallback ao index.html em cache
     (garante que, quando ha internet, sempre pega a versao mais nova).
   - Demais GET: cache-first com atualizacao em background.
   - Nao intercepta POST nem outras origens. */
self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var sameOrigin = req.url.indexOf(self.location.origin) === 0;
  if (!sameOrigin) return; /* deixa fontes/CDN passarem direto */

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (r) {
          return r || caches.match('./');
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function (cached) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    })
  );
});

/* Permite forcar atualizacao via postMessage({type:'SKIP_WAITING'}) */
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
