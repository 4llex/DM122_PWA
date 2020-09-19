const cacheName = 'app-shell-v1';

const assetsToCache = [
    'offline.html'
];

async function cacheStaticAssets() {
    const cache = await caches.open(cacheName);
    return cache.addAll(assetsToCache);
}
  

self.addEventListener('install', event => {
    console.log('[Service Worker] Installing service worker...');
    event.waitUntil(cacheStaticAssets());
    self.skipWaiting();
});
  
  

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating service worker...');
    return self.clients.claim();
});

async function networkFirst(request) {
    try {
      return await fetch(request);
    } catch (error) {
      const cache = await caches.open(cacheName);
      return cache.match('offline.html');
    }
}
  
self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetch event...', event);
    event.respondWith(networkFirst(event.request));
});
  