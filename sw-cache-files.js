
const cacheName = "gtsw_files_cache_v1";

const filesToCache = [
    "index.html",
    "about.html",
    "css/style.min.css",
    "js/main.js"
];

// Call Installation Event.
self.addEventListener("install", (e) => {
    console.log("Service Worker Installed.");

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log("Service Worker : Cache Files.");
                cache.addAll(filesToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activation Event.
self.addEventListener("activate", (e) => {
    console.log("Service Worker Activated.");
    // Remove Unwanted Caches.
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log("Service Worker : Cleaning Old Cache.");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch Event.
self.addEventListener("fetch", (e) => {
    console.log("Service Worker Fetching...");

    // First CHeck live site & If No Live Site Then Call for Cache.
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});