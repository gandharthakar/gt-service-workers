
const cacheName = "gtsw_resp_cache_v1";

// Call Installation Event.
self.addEventListener("install", (e) => {
    console.log("Service Worker Installed.");
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
        fetch(e.request)
        .then(res => {
            // Make Copy Of Response.
            let respCopy = res.clone();
            // Open Cache.
            caches
                .open(cacheName)
                .then(cache => {
                    cache.put(e.request, respCopy);
                });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
});