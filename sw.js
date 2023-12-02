const CACHE_NAME = 'Cache';
const urlsToCache = [
  '/index.html',
  '/styles.css',
  // Inclua outros recursos que deseja armazenar em cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }

        // Não temos a resposta no cache - busca na rede
        return fetch(event.request);
      })
  );
});