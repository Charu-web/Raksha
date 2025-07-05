onst CACHE_NAME = "safeher-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/main.json",
  "/icons/icon-192.png", // adjust these to your icon paths
  "/icons/icon-512.png"
];

// Install event - caching files
self.addEventListener("install", event => {
  console.log("[Service Worker] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("[Service Worker] Caching app files");
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", event => {
  console.log("[Service Worker] Activating...");
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event - serve cached content if offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the file
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
