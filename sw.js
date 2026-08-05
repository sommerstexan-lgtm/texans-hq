/* Texans HQ PWA — Service Worker v14
   Network-first for app shell so Camp/News logic updates deploy.
   Cache fallback keeps offline shell working.
*/
const CACHE_NAME = 'texans-hq-v14';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isAppShell(url) {
  const path = url.pathname;
  return (
    path.endsWith('/') ||
    path.endsWith('/index.html') ||
    path.endsWith('/app.js') ||
    path.endsWith('/styles.css') ||
    path.endsWith('/manifest.json') ||
    path.endsWith('/sw.js') ||
    path.endsWith('/icon-192.png') ||
    path.endsWith('/icon-512.png')
  );
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // App shell: network-first, cache fallback (fixes "Camp never updates after deploy")
  if (url.origin === self.location.origin && isAppShell(url)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // ESPN / external: network-first, optional cache of successful responses
  event.respondWith(
    fetch(req, { cache: 'no-store' })
      .then((res) => {
        if (res.ok && (url.hostname.includes('espn') || url.hostname.includes('nfldata'))) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
