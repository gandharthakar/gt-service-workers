
// First check if SW is supported in your browser or not.

if ("serviceWorker" in navigator) {
    // console.log("Service Workers Supported");

    let responseCache = false;
    let cacheSrc = responseCache ? "sw-cache-response.js" : "sw-cache-files.js";

    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register(cacheSrc)
            .then(reg => console.log('Service Worker Registered'))
            .catch(err => console.log('Service Worker Error : ' + err));
    })
} else {
    console.warn("Service Workers Are Not Supported By Your Browser.")
}