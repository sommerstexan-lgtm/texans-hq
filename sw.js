/* Texans HQ PWA — Service Worker v11 */
const CACHE_NAME = 'texans-hq-v11';
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

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Cache-first for app shell; network-first for ESPN/public data with offline fallback
  if (APP_SHELL.some((p) => url.pathname.endsWith(p.replace('./', '')) || url.pathname.endsWith('/'))) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
    return;
  }
  // For external data: try network, fall back to cache if we previously stored it
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok && (url.hostname.includes('espn') || url.hostname.includes('nfldata'))) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
