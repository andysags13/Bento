// Service Worker pour Bento PWA
const CACHE_NAME = 'bento-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.css',
  '/config.js',
  '/assets/js/layout.js',
  '/assets/js/time.js',
  '/assets/js/greeting.js',
  '/assets/js/weather.js',
  '/assets/js/buttons.js',
  '/assets/js/lists.js',
  '/assets/js/enhanced-features.js',
  '/assets/js/main.js',
  '/assets/fonts/Nunito-Regular.ttf',
  '/assets/fonts/Nunito-Bold.ttf',
  '/assets/fonts/Nunito-Light.ttf'
];

// Installation du service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner la ressource du cache si elle existe
        if (response) {
          return response;
        }
        
        // Sinon, faire la requête réseau
        return fetch(event.request).then(response => {
          // Vérifier si la réponse est valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Cloner la réponse
          const responseToCache = response.clone();
          
          // Ajouter au cache
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Gestion des messages
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});